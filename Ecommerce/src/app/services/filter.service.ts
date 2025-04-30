import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filteredProducts: any[] = []; // save filtered products

  // Create a BehaviorSubject to hold filtered products
  private filteredProductsSubject = new BehaviorSubject<any[]>(this.filteredProducts); // Start with an empty array
  filteredProducts$ = this.filteredProductsSubject.asObservable(); // Observable to subscribe to

  // Set filtered products and notify subscribers
  setFilteredProducts(products: any[]) {
    this.filteredProducts = products;
    this.filteredProductsSubject.next(this.filteredProducts);  // Update the BehaviorSubject
    // console.log("🔹 FilterService: Saved filtered products", this.filteredProducts);
  }

  // Get filtered products directly from the service (it returns the current state)
  getFilteredProducts(): any[] {
    // console.log("🔹 FilterService: Returning filtered products", this.filteredProducts);
    return this.filteredProducts;
  }

  // Apply price filter
  filterByPrice(items: any[] | undefined, price: number): any[] {
    if (!items) {
      // console.error('Items array is undefined!');
      return [];
    }
    // console.log(`Filtering products by price: ${price}`);
    return items.filter(item => item.price <= price);
  }

  // Sort products by price
  sortByPrice(items: any[], order: string): any[] {
    return items.sort((a, b) => order === 'low' ? a.price - b.price : b.price - a.price);
  }

}
