import { Item, items } from "../models/item";


// get all food items from local storage, if they don't exist, initialize them from items.ts
export function getAllItems(): Item[] {
    // let allItems = localStorage.getItem('items');
    // if (allItems === null || allItems === undefined) {
    //     allItems = initializeItems();
    // }
    // const itemsGlobal: Item[] = JSON.parse(allItems!);
    const itemsGlobal: Item[] = getAllItemsFromLS();
    itemsGlobal.forEach(item => {
        const index = items.findIndex(i => i.name === item.name);
        if (index < 0)
            items.push(item);
    });
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
    return itemsGlobal;
}

/// get all food items from local storage, and add the given item to it and save it
export function addGlobalItem(item: Item): void {
    const itemsGlobal: Item[] = getAllItemsFromLS();
    itemsGlobal.push(item);
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
}


/// get all food items from local storage and remove the item with the given id
export function removeGlobalItem(id: string): void {
    const itemsGlobal: Item[] = getAllItemsFromLS();
    const item = itemsGlobal.findIndex(i => i.id === id);
    if (item > -1) itemsGlobal.splice(item, 1);
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
}


/// get all food items from local storage and update the item with the given id, with the given item
export function updateItemInGlobal(id: string, item: Item): void {
    if (!id) return;
    const itemsGlobal: Item[] = getAllItemsFromLS();
    const findItem = itemsGlobal.find(i => i.id === id);
    if (!findItem) return;
    findItem.category = item.category;
    findItem.name = item.name;
    findItem.pic = item.pic;
    findItem.price = item.price;
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
}


/// get all food items from local storage
function getAllItemsFromLS(): Item[] {
    let allItems = localStorage.getItem('items');
    if (allItems === null || allItems === undefined) {
        allItems = initializeItems();
    }
    const itemsGlobal: Item[] = JSON.parse(allItems!);
    return itemsGlobal;
}


/// initialize food items from items.ts and save them to local storage
export function initializeItems(): string {
    localStorage.setItem('items', JSON.stringify(items));
    const allItems = localStorage.getItem('items') as string;
    return allItems;
}
