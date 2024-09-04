import { Cart } from '../models/cart';
import { Item, ItemCategory } from '../models/item';
import { renderHeader, renderNewDivElement } from './header/header';
import { renderCart } from './cart/cart';
import './update/deleteEditItem.scss'
import { removeItem } from './addItems/addItem';
import { homePage } from '../controllers/home';
import { renderEditItem } from '../controllers/editItem';

export function renderHomePage(cart: Cart, items: Item[]) {
    let content = document.querySelector('#content');
    if (!content) {
        renderNewDivElement('content');
        content = document.querySelector('#content')!;
    }
    const user = JSON.parse(localStorage.getItem('CurrentUser') as string);

    const categories = Object.values(ItemCategory);
    let html = '';
    categories.forEach(category => {
        const categoryItems = items.filter(item => item.category === category);
        if (categoryItems.length > 0) {
            html += `<h2>${category}</h2>`;
            html += `<div class="item-list">`;
            categoryItems.forEach(item => {
                const count = cart.getItemCount(item.id);
                html += `<div class="item-card">
                <img src="${item.pic}" alt="${item.name}">
                ${user.type === 'Admin' ? `<div class="edit-delete"><span class="delete-item" data-id="${item.id}">Delete</span>
                                            <span class="edit-item" data-id="${item.id}">Edit</span></div>` : ''}
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
            html += `</div>`;
        }
    });
    html += `<div class="total-section">Total: $${cart.totalPrice.toFixed(2)}</div>`;
    content!.innerHTML = html;
    handleEventListeners(cart, items);
}

export function handleEventListeners(cart: Cart, items: Item[], renderCartPage: boolean = false) {
    document.querySelectorAll('.add-to-order').forEach((button) => {
        button.addEventListener('click', (e) => {
            prepareOrder(e, items, cart, renderCartPage);
        });
    });
    document.querySelectorAll('.increase').forEach((button) => {
        button.addEventListener('click', (e) => {
            prepareOrder(e, items, cart, renderCartPage);
        });
    });
    document.querySelectorAll('.decrease').forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = (e.target as HTMLButtonElement).dataset.id!;
            cart.removeItem(id);
            renderCartPage === true ? renderCart(cart) : renderHomePage(cart, items);
            renderHeader();

        });
    });
    const deleteItem = document.querySelectorAll('.delete-item') as NodeListOf<HTMLButtonElement>;
    const editItem = document.querySelectorAll('.edit-item') as NodeListOf<HTMLButtonElement>;

    if (deleteItem) deleteItem.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = (e.target as HTMLButtonElement).dataset.id!;
            console.log('delete', id);
            removeItem(id);
            cart.removeAllItemsInCart(id);
            homePage()
        });
    });
    if (editItem) editItem.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = (e.target as HTMLButtonElement).dataset.id!;
            console.log('edit', id);
            renderEditItem(id);

        });
    });
}


function prepareOrder(e: Event, items: Item[], cart: Cart, renderCartPage: boolean) {
    const id = (e.target as HTMLButtonElement).dataset.id!;
    const item = items.find((item) => item.id === id);
    if (item) {
        cart.addItem(item);
        renderCartPage === true ? renderCart(cart) : renderHomePage(cart, items);
        renderHeader();
    }
}

