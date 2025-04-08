import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
];
