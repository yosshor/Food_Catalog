import { homePage } from '../../controllers/home';
import { Cart } from '../../models/cart';
import { addItem } from '../addItems/addItem';
import { renderCartPage, getCart } from '../../controllers/cart';
import { handleClickSignOut } from '../../controllers/authentication/signup';

export function renderHeader() {
    let header = document.querySelector("#header");
    const user = JSON.parse(localStorage.getItem('CurrentUser') as string);
    const cart = getCart();

    const userName = user.firstName + ' ' + user.lastName;
    if (!header) {
        renderNewDivElement('header');
        header = document.querySelector("#header")!;
    }

    header.innerHTML = `
        <div class="header">
            <div class="header__nav">
                <div class="header__logo">
                    <img src="./src/assets/images/logo-text.png" alt="logo">
                </div>
                <div class="header__menu">
                    <a id="home" href="#home">Home</a>
                    ${user.type === 'Admin' ? `<a id="addItem" href="#AddItem">Add Item</a>`: ''}
                    <a id="cartItems" href="#cartItems">Cart</a>
                </div>
                <div class="header__icons">
                ${user.type}
                ${renderHeaderUser(userName ?? 'User', cart as Cart)}
                    <div class="header__search_bar">
                        <input type="text" id="search-input" placeholder="Search...">
                        <label for="search-input">
                        <i class='bx bx-search'></i>
                        <p class="last">Search</p>
                        </label>
                        </div>
                        <button type="button" id="signOut-button">SignOut</button>
                </div>
            </div>
        </div>
    `;
    addEventListener();

}

function renderHeaderUser(userName: string, cart: Cart) {
    const html = `

            <div class="header__user__name">
                <i class='bx bx-user'></i> Hello, ${userName}
            </div>
            <div class="header__user__cart">
                <i class='bx bx-cart'></i>
                <span>${cart.totalItems() !== undefined ? cart.totalItems() : 0}</span>
            </div>

    `;
    return html;
}
function addEventListener() {
    const home = document.querySelector("#home");
    const addItem = document.querySelector("#addItem");
    const cartItems = document.querySelector("#cartItems");
    const cartIcon = document.querySelector(".header__user__cart")
    const signOut = document.querySelector("#signOut-button");
    if (home) {
        home.addEventListener('click', handleHomeClick);
    }
    if (addItem) {
        addItem.addEventListener('click', handleAddItemClick);
    }
    if (cartItems) {
        cartItems.addEventListener('click', handleCartItemsClick);
    }
    if(cartIcon) {  
        cartIcon.addEventListener('click', handleCartItemsClick);
    }
    if(signOut) {
        signOut.addEventListener('click', handleClickSignOut)

    }
}


function handleHomeClick() {
    homePage();
}

function handleAddItemClick() {
    const page = document.querySelector("#content")! as HTMLDivElement;
    addItem(page);
    console.log('AddItem');
}

export function renderNewDivElement(name: string): void {
    const element = document.createElement('div');
    element.id = name;
    document.body.appendChild(element);
}

function handleCartItemsClick() {
    console.log('CartItems');
    renderCartPage();
}