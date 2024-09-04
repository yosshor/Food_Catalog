import { getCart } from "./home";
import { Cart } from "../models/Cart";
import '../views/cart/cart.scss';
import { renderCart } from "../views/cart/cart";


/**
 * Renders the cart page, given the cart items from the user's cart.
 * @remarks
 * If the user's cart is empty, the function will render a message
 * indicating that the cart is empty.
 * @param cart - The user's cart.
 */
export function renderCartPage() {
    const cart: Cart | undefined = getCart();
    renderCart(cart!);
}
