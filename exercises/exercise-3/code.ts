import { AssertAssignable } from "../util";

type Foo = Protein | EntreeType;

/* Monster Foodies Food Truck Menu
Taco....................$5
  Protein
    Chicken
    BBQ jackfruit
    Carnitas (+$2)
    Salsa (+$0.50)
  Add a second taco for +$3 (+$4 for Carnitas)
Sushi ..................$8
  Protein
    Tuna
    King Salmon (+$2)
  Rice
    White Rice
    Brown Rice (+$1)
Sandwich................$4
  Protein
    Chicken
    BBQ Jackfruit
    Portabello Cap (+$2)
  Optional 1 topping, extra toppings +$0.50
    Cheese
    Lettuce
    Tomato
Add AwesomeSauce to anything for $1!
*/

export type Protein =
  | "chicken" // 🐓
  | "jackfruit" // 🍈
  | "tuna" // 🐟

  // Pricey Proteins
  | "carnitas" // 🐖
  | "kingSalmon" // 🐟
  | "portabelloCap"; // 🍄

export type EntreeType =
  | "taco" // 🌮
  | "sushi" // 🍣
  | "sandwich"; // 🍞

export type Topping =
  | "cheese" // 🧀
  | "lettuce" // 🥗
  | "tomato"; // 🍅

export type RiceType =
  | "brownRice" // 🍘
  | "whiteRice"; // 🍙

type Taco = {
  type: "taco";
  protein:
    | "chicken" // 🐓
    | "jackfruit" // 🍈
    | "carnitas"; // 🐖
  extraTaco: boolean;
  salsa: boolean;
};

type Sushi = {
  type: "sushi";
  protein: "kingSalmon" | "tuna";
  riceType: RiceType;
};

type Sandwich = {
  type: "sandwich";
  protein:
    | "chicken" // 🐓
    | "jackfruit" // 🍈
    | "portabelloCap"; // 🍄
  toppings: Topping[];
};

/*
 * ======================================================
 * TODO: Update LineItem to represent an order from the
 * Monster Foodies Truck.
 * ======================================================*/
export type LineItem = (Taco | Sushi | Sandwich) & { awesomeSauce: boolean };

export interface Order {
  lineItems: LineItem[];
}

function getTacoPrice({ protein, extraTaco, salsa }: Taco) {
  let price = 5;
  if (protein === "carnitas") {
    price += 2;
  }
  if (extraTaco) {
    price += protein === "carnitas" ? 4 : 3;
  }
  if (salsa) {
    price += 0.5;
  }
  return price;
}

function getSushiPrice({ protein, riceType }: Sushi) {
  let price = 8;
  if (protein === "kingSalmon") {
    price += 2;
  }
  if (riceType === "brownRice") {
    price += 1;
  }
  return price;
}

function getSandwichPrice({ protein, toppings }: Sandwich) {
  let price = 4;
  if (protein === "portabelloCap") {
    price += 2;
  }
  if (toppings.length > 1) {
    price += (toppings.length - 1) * 0.5;
  }
  return price;
}

export function getLineItemPrice(lineItem: LineItem): number {
  let price = lineItem.awesomeSauce ? 1 : 0;
  switch (lineItem.type) {
    case "taco":
      return price + getTacoPrice(lineItem);
    case "sushi":
      return price + getSushiPrice(lineItem);
    case "sandwich":
      return price + getSandwichPrice(lineItem);
  }
}

/*
 * ======================================================
 * TODO: Implement priceOrder.
 * ======================================================*/
export function priceOrder(order: Order): number {
  return order.lineItems
    .map(getLineItemPrice)
    .reduce((price, itemPrice) => price + itemPrice, 0);
}

/* Monster's foodie truck takes orders on paper slips,
   but sometimes people don't read the menu before they
   order. */
type PaperLineItem = {
  type: EntreeType;
  protein: Protein;
  awesomeSauce: boolean;
  extraTaco?: boolean;
  riceType?: RiceType;
  salsa?: boolean;
  toppings?: Topping[];
};

type _t1 = AssertAssignable<PaperLineItem, LineItem>;
