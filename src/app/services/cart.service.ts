import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';  // LocalStorage-ის გასაღები

  constructor() { }

  // პროდუქტის დამატება კალათაში
  addToCart(product: any): void {
    let cartItems = this.getCartItems();  // კალათის აღდგენა LocalStorage-დან
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // თუ პროდუქტი უკვე არსებობს, რაოდენობა უნდა გაიზარდოს
    } else {
      cartItems.push({ ...product, quantity: 1 }); // ახალი პროდუქტის დამატება
    }

    this.saveCartItems(cartItems);  // კალათის შენახვა LocalStorage-ში
  }

  // კალათის პროდუქტის სიას დაბრუნება
  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];  // თუ LocalStorage-ია ცარიელი, მაშინ ცარიელი მასივი
  }

  // კალათაში პროდუქტის რაოდენობის განახლება
  updateQuantity(productId: number, quantity: number): void {
    let cartItems = this.getCartItems();
    const product = cartItems.find(item => item.id === productId);

    if (product) {
      product.quantity = quantity;  // პროდუქტის რაოდენობის განახლება
      this.saveCartItems(cartItems);  // კალათის განახლება LocalStorage-ში
    }
  }

  // კალათიდან პროდუქტის წაშლა
  removeFromCart(productId: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.id !== productId);  // პროდუქტის ამოღება კალათიდან

    this.saveCartItems(cartItems);  // კალათის განახლება LocalStorage-ში
  }

  // LocalStorage-ში კალათის მონაცემების შენახვა
  private saveCartItems(cartItems: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));  // კალათის გადანახვა LocalStorage-ში
  }

  // კალათის გასუფთავება
  clearCart(): void {
    localStorage.removeItem(this.cartKey);  // LocalStorage-ში არსებული კალათის ინფორმაცია წაშლა
  }
}
