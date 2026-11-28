// Export autonome, sans dépendance, depuis la même carte que les pages web.
// À relancer après une modification de src/data/pizzas.json : npm run menu:export
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const { pizzas, diameter } = JSON.parse(readFileSync(new URL("src/data/pizzas.json", root), "utf8"));
const commands = [];
const winAnsi = new Map([[0x20ac, 0x80], [0x2019, 0x92], [0x2013, 0x96], [0x153, 0x9c], [0x202f, 0x20]]);
const hex = (value) => Buffer.from(Array.from(value, (char) => {
  const code = char.codePointAt(0);
  if (code <= 255) return code;
  if (winAnsi.has(code)) return winAnsi.get(code);
  throw new Error(`Caractère PDF non pris en charge : ${char}`);
})).toString("hex");
const navy = "0.122 0.169 0.357";
const cream = "0.953 0.925 0.890";
const gold = "0.882 0.737 0.420";
const ink = "0.333 0.251 0.169";

function text(value, x, y, size = 12, font = "F1", color = ink) {
  commands.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm <${hex(value)}> Tj ET`);
}
function wrap(value, limit) {
  const lines = [""];
  for (const word of value.split(" ")) {
    const last = lines.length - 1;
    if (lines[last] && `${lines[last]} ${word}`.length > limit) lines.push(word);
    else lines[last] += `${lines[last] ? " " : ""}${word}`;
  }
  return lines;
}

commands.push(`${cream} rg 0 0 595 842 re f`, `${navy} rg 0 710 595 132 re f`);
text("Namas’Thés · Saint-Viance", 40, 802, 14, "F2", gold);
text("Notre carte des pizzas", 40, 758, 30, "F3", cream);
text(`${pizzas.length} recettes artisanales et gourmandes · Format ${diameter} cm`, 40, 729, 12, "F1", cream);

pizzas.forEach((pizza, index) => {
  const x = 40 + (index % 2) * 265.5;
  const top = 692 - Math.floor(index / 2) * 145;
  commands.push(`1 0.985 0.960 rg ${gold} RG 0.7 w ${x} ${top - 133} 249.5 133 re B`);
  text(pizza.name, x + 16, top - 27, 19, "F3", navy);
  wrap(pizza.ingredients, 39).forEach((line, lineIndex) => text(line, x + 16, top - 51 - lineIndex * 14, 10.5));
  text(`${diameter} cm`, x + 16, top - 116, 10, "F1");
  const price = pizza.price.toFixed(2).replace(".", ",") + " €";
  text(price, x + 170, top - 116, 16, "F2", navy);
});
text("Sur place ou à emporter · Commandes : 05 55 23 10 16", 40, 83, 13, "F2", navy);
text("1 Place du Commerce, 19240 Saint-Viance", 40, 61, 11);

const stream = commands.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic /Encoding /WinAnsiEncoding >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
];
let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
mkdirSync(new URL("public/menus/", root), { recursive: true });
writeFileSync(new URL("public/menus/carte-pizzas-namasthes.pdf", root), pdf);
console.log(`Carte PDF exportée : ${pizzas.length} pizzas, format ${diameter} cm.`);
