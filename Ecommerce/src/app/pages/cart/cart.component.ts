import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();  // LocalStorage-დან კალათის მონაცემების აღდგენა
    this.calculateTotalPrice();
  }

  // რაოდენობის განახლება
  updateQuantity(productId: number, quantity: number): void {
    if (quantity >= 1) { // მინიმუმ 1 პროდუქტი
      this.cartService.updateQuantity(productId, quantity);  // LocalStorage-ში განახლება
      this.cartItems = this.cartService.getCartItems();  // კალათის განახლება
      this.calculateTotalPrice();  // საერთო თანხის განახლება
    }
  }

  // კალათიდან პროდუქტის ამოღება
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);  // LocalStorage-დან წაშლა
    this.cartItems = this.cartService.getCartItems();  // კალათის განახლება
    this.calculateTotalPrice();  // საერთო თანხის განახლება
  }

  // კალათაში პროდუქტების მთლიანი ფასის გამოთვლა
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);
  }
}
