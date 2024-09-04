import { renderFooter } from '../views/FooterView';
import { renderHeader } from '../views/HeaderView';
import { renderHomePage } from '../views/HomeView';
import { Cart } from "../models/Cart";
import { getAllItems, initializeItems } from './ItemsController';
import { Item } from '../models/Item';



export function getCart(): Cart | undefined {
  const { cartId, userId, items, totalPrice } = JSON.parse(localStorage.getItem('cart') || '{}')
  const cart: Cart = new Cart(cartId, userId, items, totalPrice);
  return cart
}


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


