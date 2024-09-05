import { items } from "../../models/item";
import { addGlobalItem, removeGlobalItem } from "../../controllers/items";
import { Item, ItemCategory } from "../../models/item";
import './addItem.scss';
import { homePage } from "../../controllers/home";


/// render add item page
export function addItem(div: HTMLDivElement): void {
    if (!div) {
        throw new Error('add item div not found');
    }
    const newItem = `
        <div class="form-wrapper">
            <div class="wrapper">
                <h1>Add New Item</h1>   
                <div class="form">
                    <form id="addItemForm">
                        <div class="name">      
                            <label>Name : </label>
                            <input type="text" for="name" id="name" placeholder="Enter Item Name" required>
                        </div>
                        <div class="price">
                            <label>Price : </label>
                            <input type="number" step="0.01" min="0" for="price" id="price" placeholder="Enter Item Price" required>
                        </div>  
                        <div class="pic">      
                            <label>Picture Url : </label>
                            <input type="text" for="pic" id="pic" placeholder="Enter Picture Url" required>
                        </div>
                        <div class="category">
                            <label>Category : </label>
                            <select name="category" id="category">
                            ${Object.values(ItemCategory).map(category =>
                                `<option value="${category}">${category}</option>`)
                                    .join('')}
                                </select>
                        </div>
                        <div class="submit">
                            <button type="submit" value="Add Item" >Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    div.innerHTML = newItem;
    const addItemForm = document.querySelector('#addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', handleAddItemSubmit);
    }
}


/// remove item
export function removeItem(id: string): void {
    if (id) {
        const index = items.findIndex(item => item.id === id);
        if (index > -1) {
            items.splice(index, 1);
        }
        removeGlobalItem(id);
    }

}

/// Handle add item submit event
function handleAddItemSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const { name, price, pic, category } = {
        name: form.name.value as string,
        price: form.price.value as number,
        pic: form.pic.value,
        category: form.category.value
    };

    if (name === null || pic === null || price === null || category === null) {
        alert("All fields are required");
        return;
    }

    const newItem = new Item(category, pic, name, Number(price) as number);
    items.push(newItem);
    addGlobalItem(newItem);
    form.reset();

    //render home page
    homePage();
}

