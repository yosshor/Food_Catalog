import { Cart } from "../../models/cart";
import { renderNewDivElement } from "../header/header";
import { handleEventListeners } from "../home";
import { handleCheckoutEvent } from "../../controllers/cart";
import './cart.scss';


export function renderCart(cart: Cart) {
    const app = document.querySelector("#app");
    if (app) app?.remove();
    try {

        let content = document.querySelector('#content');
        if (!content) {
            renderNewDivElement('content');
            content = document.querySelector('#content')!;
        }
        let html = '';
        html += `<h2>Your Cart Data</h2>`;
        html += `<div class="cart-wrapper"><div class="item-list">`;
        const itemsId: string[] = [];
        if (cart.items.length === 0) {
            html += `<h3>Your cart is empty</h3>`
        }
        else {
            cart.items.forEach(item => {
                const count = cart.getItemCount(item.id);
                if (itemsId.includes(item.id)) return;
                itemsId.push(item.id);
                html += `<div class="item-card">
                <img src="${item.pic}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                ${count > 0 ? `<div class="item-quantity">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${count}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                  </div>`: `<button class="add-to-order" data-id="${item.id}">Add to order</button>`
                    }
              </div>`;
            });
        }
        html += `</div>`;
        html += renderTotalOrder(cart);
        content.innerHTML = html;
        handleEventListeners(cart, cart.items, true);
        const checkout = document.querySelector('#checkout');
        if (checkout) {
            checkout.addEventListener('click', handleCheckoutEvent);
        };
    } catch (error) {
        console.error(error);
    }
}

function renderTotalOrder(cart: Cart): string {

    let total: string =
        `<div class="total">
    <div class="col-25">
        <div class="container">
        <h4>Cart <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> 
        <b>${cart.totalItems()}</b></span></h4>`;
    cart.items.forEach(item => {
        total += `<p><a href="#">${item.name}</a> <span class="price">$${item.price.toFixed(2)}</span></p>`
    });
    total += `<hr>
            <p>Total <span class="price" style="color:black"><b>$${cart.totalPrice.toFixed(2)}</b></span></p>
        </div>
              <button id='checkout' type="submit" value="Continue to checkout" class="btn">Continue to checkout</button>
       </div>
      </div>
    </div>`

    return total;
}
