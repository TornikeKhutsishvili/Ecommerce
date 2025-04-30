import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  paymentMethod: string = 'Cash on Delivery'; // Default selected method
  cartItems: any[] = [];
  totalPrice: number = 0;

  user: { name: string, email: string, address: string, paymentMethod: string } = {
    name: '',
    email: '',
    address: '',
    paymentMethod: 'Credit Card'
  };


  // Form fields
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paypalEmail: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems() || [];
    // console.log(this.cartItems);
    this.calculateTotalPrice();


    // Handle the checkout form submission here
    // console.log('Order submitted with payment method:', this.paymentMethod);
    // console.log('Card Number:', this.cardNumber);
    // console.log('Expiry Date:', this.expiryDate);
    // console.log('CVV:', this.cvv);
    // console.log('PayPal Email:', this.paypalEmail);
  }

  // Checkout-ის პროცესის დასრულება
  completeCheckout(): void {
    // აქ შეგიძლია დაამატო გადახდის სისტემა ან ჩეკაუტის სხვა ლოგიკა
    alert('Checkout Completed!');
    // კალათის გასუფთავება
    this.cartService.clearCart();
    alert(`Checkout completed for ${this.user.name}`);
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);
  }

  // Handle payment method selection change
  onPaymentMethodChange(): void {
    // Additional logic for handling form submission, if needed.
    console.log('Selected Payment Method:', this.paymentMethod);
  }

  // Form submission handler
  onSubmit(): void {
    // Handle the checkout form submission here
    console.log('Order submitted with payment method:', this.paymentMethod);
  }

  // Format the card number as the user types
  formatCardNumber(): void {
    // Remove all non-digit characters
    let formattedCardNumber = this.cardNumber.replace(/\D/g, '');

    // Split the digits into groups of 4 and join with '-'
    if (formattedCardNumber.length > 4) {
      formattedCardNumber = formattedCardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
    }

    // Update the cardNumber with formatted value
    this.cardNumber = formattedCardNumber;
  }
}
