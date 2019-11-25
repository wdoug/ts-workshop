import { Order, LineItem } from "../exercise-3/code";
import {
  ReceiptProps,
  ItemSummaryProps,
  AdditionSummaryProps
} from "../exercise-4/code";
import { priceOrder, getLineItemPrice } from "../exercise-3/code";

function getItemProps(lineItem: LineItem): ItemSummaryProps {
  const additions: AdditionSummaryProps[] = [
    {
      additionType: lineItem.protein
    }
  ];
  if (lineItem.type === "taco") {
    if (lineItem.salsa) {
      additions.push({ additionType: "salsa" });
    }
    if (lineItem.extraTaco) {
      additions.push({ additionType: "extraTaco" });
    }
  } else if (lineItem.type === "sandwich") {
    if (lineItem.protein === "portabelloCap") {
      additions[0].annotation = "pricey";
    }
    if (lineItem.toppings.length > 0) {
      lineItem.toppings.forEach(topping => {
        additions.push({ additionType: topping });
      });
    }
  } else if (lineItem.type === "sushi") {
    if (lineItem.protein === "kingSalmon") {
      additions[0].annotation = "pricey";
    }
    additions.push({ additionType: lineItem.riceType });
  }
  if (lineItem.awesomeSauce) {
    additions.push({
      additionType: "awesomeSauce",
      annotation: "nuclear"
    });
  }
  return {
    entreeType: lineItem.type,
    additions,
    itemTotal: getLineItemPrice(lineItem),
    mindBlowing: lineItem.awesomeSauce
  };
}

export function orderToReceipt(order: Order, tip: number): ReceiptProps {
  const subtotal = priceOrder(order);
  return {
    items: order.lineItems.map(getItemProps),
    tip,
    subtotal,
    total: subtotal + tip
  };
}
