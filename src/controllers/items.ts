import { Item, items } from "../models/item";

export function getAllItems(): Item[] {
    let allItems = localStorage.getItem('items');
    if (allItems === null || allItems === undefined) {
        allItems = initializeItems();
    }
    const itemsGlobal: Item[] = JSON.parse(allItems!);
    itemsGlobal.forEach(item => {
        const index = items.findIndex(i => i.name === item.name);
        if (index < 0)
            items.push(item);
    });
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
    return itemsGlobal;
}

export function addGlobalItem(item: Item): void {
    const itemsGlobal: Item[] = getAllItemsFromLS();
    itemsGlobal.push(item);
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
}

export function removeGlobalItem(id: string): void {
    const itemsGlobal: Item[] = getAllItemsFromLS();
    const item = itemsGlobal.findIndex(i => i.id === id);
    if (item > -1) itemsGlobal.splice(item, 1);
    localStorage.setItem('items', JSON.stringify(itemsGlobal));
}

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

function getAllItemsFromLS(): Item[] {
    let allItems = localStorage.getItem('items');
    if (allItems === null || allItems === undefined) {
        allItems = initializeItems();
    }
    const itemsGlobal: Item[] = JSON.parse(allItems!);
    return itemsGlobal;
}

export function initializeItems(): string {
    localStorage.setItem('items', JSON.stringify(items));
    const allItems = localStorage.getItem('items') as string;
    return allItems;
}
