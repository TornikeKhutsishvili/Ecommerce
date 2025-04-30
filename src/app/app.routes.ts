import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  { path: 'product/:id',
    loadComponent: () => import('./pages/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    data: {
      getPrerenderParams: () => {
        return [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
          { id: '5' },
          { id: '6' },
          { id: '7' },
          { id: '8' },
          { id: '9' },
          { id: '10' },
          { id: '11' },
          { id: '12' },
          { id: '13' },
          { id: '14' },
          { id: '15' },
          { id: '16' },
          { id: '17' },
          { id: '18' },
          { id: '19' },
          { id: '20' },
        ];
      }
    }
  },
  { path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent)
  },
  { path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent)
  },
  { path: '**', redirectTo: '' },
];
