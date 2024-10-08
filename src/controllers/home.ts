import { renderFooter } from '../views/footer/footer';
import { renderHeader } from '../views/header/header';
import { renderHomePage } from '../views/home';
import { Cart } from "../models/cart";
import { getAllItems, initializeItems } from './items';
import { Item } from '../models/item';
import { getCart } from './cart';




/**
 * Renders the home page of the application, including the header, 
 * the items in the catalog, and the footer.
 */
export function homePage() {
  let allItems: Item[] = getAllItems();
  const cart: Cart = getCart() ?? new Cart();
  if (allItems.length === 0) {
    console.log("Length", allItems.length);
    allItems = JSON.parse(initializeItems());
  }
  renderHeader();
  renderHomePage(cart, allItems);
  renderFooter();
}


