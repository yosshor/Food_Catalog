import { Item } from "../models/item";
import { editItemPage } from "../views/update/editItem";
import { homePage } from "./home";
import { getAllItems, updateItemInGlobal } from "./items";

// render edit item page with event listener
export function renderEditItem(id: string): void {
    try {
        const content = document.querySelector("#content") as HTMLDivElement;
        const item: Item = getAllItems().find(item => item.id === id) as Item;
        if (content) {
            content.innerHTML = editItemPage(item);
            content.addEventListener('submit', handleSubmitUpdateItem);
        }
    } catch (error) {
        console.error(error);
    }
}

// handle form submit of an update food item
function handleSubmitUpdateItem(event: Event): void {
    try {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const id = form?.id;
        const { name, price, category, pic } = {name:form?.name.value,
                                                price:form?.price.value,
                                                pic:form?.pic.value,
                                                category:form?.category.value};
        console.log(form?.name.value);
        console.log(form?.price.value);
        console.log(form?.category.value);
        console.log(form?.pic.value);
        updateItemInGlobal(id, new Item(category, pic, name, Number(price) as number));
        homePage();
    } catch (error) {
        console.error(error);
    }
}