import { Protein, Topping, EntreeType, RiceType } from "../exercise-3/code";
import React from "react";
import { Flavor } from "../util";

export interface ReceiptProps {
  /** Array of line item summaries */
  items: ItemSummaryProps[];
  /** Order subtotal */
  subtotal: number;
  /** Tip amount */
  tip: number;
  /** Order total */
  total: number;
}
export interface ItemSummaryProps {
  /** Entree type – determines emoji/label */
  entreeType: EntreeType;
  /** List of additions - protein, toppings, extras */
  additions: AdditionSummaryProps[];
  /** Backdrop on/off */
  mindBlowing: boolean;
  /** Item total beneath extras */
  itemTotal: number;
}
export interface AdditionSummaryProps {
  /** Special indicator, pricey or nuclear? */
  annotation?: Annotation;
  /** Type of protein/topping/etc. */
  additionType: FoodStuffs;
}

export type Annotation = "pricey" | "nuclear";

export type Extras = "extraTaco" | "awesomeSauce" | "salsa";

export type FoodStuffs = Protein | Topping | EntreeType | RiceType | Extras;
export interface IconProps {
  type: FoodStuffs;
}

function descFor(type: FoodStuffs): string {
  switch (type) {
    case "carnitas":
      return "🐖 Carnitas";

    // TODO: Fill me in by copying and pasting examples from the stories file
    case "taco":
      return "🌮 Taco";
    case "sushi":
      return "🍣 Sushi";
    case "sandwich":
      return "🍞 Sandwich";
    case "chicken":
      return "🐓 Chicken";
    case "jackfruit":
      return "🍈 Jackfruit";
    case "tuna":
      return "🐟 Tuna";
    case "kingSalmon":
      return "🐟 King Salmon";
    case "portabelloCap":
      return "🍄 Portobello Cap";
    case "brownRice":
      return "🍘 Brown Rice";
    case "whiteRice":
      return "🍙 White Rice";
    case "cheese":
      return "🧀 Cheese";
    case "lettuce":
      return "🥗 Lettuce";
    case "tomato":
      return "🍅 Tomato";
    case "extraTaco":
      return "🌮 Extra Taco";
    case "salsa":
      return "💃 Salsa";
    case "awesomeSauce":
      return "Awesome Sauce";

    // default:
    //   throw new Error(`Not implemented case ${type}`);
  }
}
export const Description: React.SFC<IconProps> = props => {
  return <span>{descFor(props.type)}</span>;
};

type TotalsProps = {
  /* Replace Me */
  subtotal: number;
  tip: number;
  total: number;
};
export const TotalSection: React.SFC<TotalsProps> = props => {
  // TODO: Implement me for real. Feel free to copy HTML structure from StaticExample
  // const examplePrice = 3.5;
  // return <div>{(3.5).toFixed(2)}</div>;

  return (
    <div className="total-section">
      <div className="subtotal-info">
        Subtotal: ${props.subtotal.toFixed(2)}
      </div>
      <div className="subtotal-info">Tip: ${props.tip.toFixed(2)}</div>

      <div className="grand-total">Total: ${props.total.toFixed(2)}</div>
    </div>
  );
};

function getAnnotation(annotation?: string) {
  switch (annotation) {
    case "pricey":
      return "👑";
    case "nuclear":
      return "☢️";
    default:
      return <>&nbsp;</>;
  }
}

export const AdditionSummary: React.SFC<AdditionSummaryProps> = props => (
  // TODO: Implement me for real. Feel free to copy HTML structure from StaticExample
  <li>
    <div className="crown-marker">{getAnnotation(props.annotation)}</div>
    <div
      className={`addition-label${
        props.additionType === "awesomeSauce" ? " awesome-sauce" : ""
      }`}
    >
      {descFor(props.additionType)}
    </div>
  </li>
);

export const ItemSummary: React.SFC<ItemSummaryProps> = props => (
  // TODO: Implement me for real. Feel free to copy HTML structure from StaticExample
  <div className="line-item">
    <h3 className="item-kind">{descFor(props.entreeType)}</h3>
    <ul className="addition-list">
      {/* Render an AdditionSummary using each addition as props */}
      {props.additions.map((addition, i) => (
        // Note: key is required by react for arrays of elements
        <AdditionSummary key={i} {...addition} />
      ))}
    </ul>

    <div className="item-total">Total: ${props.itemTotal}</div>

    {props.mindBlowing && <div className="awesome-sauce-backdrop">😻</div>}
  </div>
);

export const Receipt: React.SFC<ReceiptProps> = props => (
  <div className="order-summary">
    <h1>Order Summary</h1>

    {props.items.map((item, i) => (
      // Note: key is required by react for arrays of elements
      <ItemSummary key={i} {...item} />
    ))}

    <hr className="divider" />

    <TotalSection
      subtotal={props.subtotal}
      tip={props.tip}
      total={props.total}
    />
  </div>
);
