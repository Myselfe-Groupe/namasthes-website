// Transcription de public/images/carte-des-pizzas.png.
// Prix dans l'ordre : Enfant (20 cm), M (27 cm), XL (34 cm).
type Pizza = {
  name: string;
  ingredients: string;
  prices: [number | null, number | null, number | null];
  note?: string;
};

export const pizzaCategories: { title: string; pizzas: Pizza[] }[] = [
  {
    title: "Classic Pizza",
    pizzas: [
      { name: "Margherita", ingredients: "Base tomate, mozzarella, olive, feuille de basilic", prices: [7, 11, 13] },
      { name: "Reine", ingredients: "Base tomate, mozzarella, champignon, jambon, origan", prices: [8, 12, 14.5] },
    ],
  },
  {
    title: "Cheesy Pizza",
    pizzas: [
      { name: "Cheez", ingredients: "Base tomate, mozzarella, chèvre, gorgonzola, reblochon de Savoie, origan", prices: [8.5, 12.5, 15] },
      { name: "Savoyarde", ingredients: "Base crème, mozzarella, pomme de terre, reblochon de Savoie, oignon, lardons", prices: [9, 13, 15.5] },
      { name: "Raclette", ingredients: "Base crème, mozzarella, raclette, pomme de terre, jambon de pays", prices: [10, 13, 16], note: "Uniquement d’octobre à février" },
    ],
  },
  {
    title: "Healthy Pizza",
    pizzas: [
      { name: "Norvégienne", ingredients: "Base crème, mozzarella, pomme de terre, truite, aneth, citron vert", prices: [10, 13.5, 16.5] },
      { name: "Veggie", ingredients: "Base tomate, mozzarella, champignon, poivron, olive, origan", prices: [9, 12.5, 15] },
      { name: "Roco Rico", ingredients: "Base crème, mozzarella, champignon, poulet, cantal", prices: [9, 13, 16] },
    ],
  },
  {
    title: "Original Pizza",
    pizzas: [
      { name: "Hawaïenne", ingredients: "Base tomate, mozzarella, ananas, poulet", prices: [8, 12, 15] },
      { name: "Chèvre miel", ingredients: "Base crème, mozzarella, chèvre, poulet, noisette, miel", prices: [10, 13.5, 16] },
    ],
  },
  {
    title: "Les gourmandes",
    pizzas: [
      { name: "Le Coup de Cœur", ingredients: "Base tomate, mozzarella, viande hachée, scamorza fumée, oignon, olive, origan", prices: [10, 13.5, 16] },
      { name: "Chori’Love", ingredients: "Base tomate, mozzarella, chorizo, oignon, poivron, origan", prices: [10, 14, 16] },
      { name: "La Coco", ingredients: "Base crème, mozzarella, scamorza fumée, olive, burrata, jambon de pays, basilic", prices: [null, 14, 17] },
      { name: "La Pistakia", ingredients: "Base crème, mozzarella, pistache, jambon de pays, burrata, roquette, pesto", prices: [null, 14, 17] },
      { name: "Sur mesure", ingredients: "Base tomate ou crème, mozzarella. Ingrédients au choix : voir les prix des suppléments.", prices: [null, 10, 13] },
    ],
  },
  {
    title: "Les calzones",
    pizzas: [
      { name: "La Rossita", ingredients: "Base tomate, mozzarella, champignon, jambon, œuf", prices: [null, 10.5, null] },
      { name: "La Dolce Crémita", ingredients: "Base crème, mozzarella, poulet, chèvre, miel", prices: [null, 10.5, null] },
    ],
  },
];

export const pizzaSizes = ["Enfant · 20 cm", "M · 27 cm", "XL · 34 cm"];

export const pizzaToppings = [
  { name: "Fromage", price: 1.5 },
  { name: "Burrata", price: 2.5 },
  { name: "Aromate", price: 1 },
  { name: "Œuf", price: 1.5 },
  { name: "Viande", price: 2 },
  { name: "Légume", price: 1.5 },
];

// Horaires du service indiqués sur la page Pizzeria.
export const pizzaServiceHours = [
  { days: "Lundi – samedi", times: "11h30 – 14h / 19h – 21h" },
  { days: "Dimanche", times: "11h30 – 13h / 19h – 21h" },
];
