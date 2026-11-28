// Recettes et prix transcrits depuis la nouvelle carte fournie par Namas’Thés.
// Les deux pages et le PDF téléchargeable utilisent cette même source.
import menu from "./pizzas.json";

export const pizzas = menu.pizzas;
export const pizzaDiameter = menu.diameter;

// Horaires existants du service : conservés sans modification.
export const pizzaServiceHours = [
  { days: "Lundi – samedi", times: "11h30 – 14h / 19h – 21h" },
  { days: "Dimanche", times: "11h30 – 13h / 19h – 21h" },
];
