import { getCart } from "../controllers/HomeController";
import { Cart } from "../models/cart";
import '../styles/cart.scss';
import { renderCart } from "../views/CartView";


/**
 * Renders the cart page, given the cart items from the user's cart.
 *
 * @remarks
 * If the user's cart is empty, the function will render a message
 * indicating that the cart is empty.
 *
 * @param cart - The user's cart.
 */
export function renderCartPage() {
    const cart: Cart | undefined = getCart();
    renderCart(cart!);
}
