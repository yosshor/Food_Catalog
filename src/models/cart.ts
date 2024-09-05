import { Item } from './item';

/// cart model
export class Cart {
  public cartId: string;
  public userId: string;
  public items: Item[];
  public totalPrice: number;
  constructor(cartId?: string, userId?: string, items?: Item[], totalPrice?: number) {
    this.cartId = cartId ?? `id${crypto.randomUUID()}`;
    this.userId = userId ?? 'guest';
    this.items = items ?? [];
    this.totalPrice = totalPrice ?? 0;
  }

  /// add item to cart
  addItem(item: Item): void {
    this.items.push(item);
    this.totalPrice += item.price;
    this.updateLocalStorage();
  }

  /// remove item from cart
  removeItem(id: string): void {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      this.totalPrice -= this.items[itemIndex].price;
      this.items.splice(itemIndex, 1);
      this.updateLocalStorage();
    }
  }

  /// get item count
  getItemCount(id: string): number {
    return this.items.filter(item => item.id === id).length;
  }

  /// remove all items in cart
  removeAllItemsInCart(id: string): void {
    const items = this.items.filter(item => item.id === id);
    if (items.length > 0) {
      items.forEach(item => {
        const itemIndex = this.items.findIndex(i => i.id === item.id);
        this.items.splice(itemIndex, 1);
      })
    }
    this.updateLocalStorage();
  }

  /// update local storage cart
  updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this));
  }

  /// get cart from local storage and parse it
  getCartFromLocalStorage(): Cart {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
    return new Cart();
  }

  /// get total items
  totalItems(): number {
    console.log(this.items.length);
    return this.items.length ?? 0;
  }
}
