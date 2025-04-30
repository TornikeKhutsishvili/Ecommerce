import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchService } from '../../services/search.service';
import { CaruselComponent } from "../carusel/carusel.component";
import { FilterService } from '../../services/filter.service';
import { Product } from '../../product.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    CaruselComponent,
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredProducts: any[] = [];
  products: any[] = [];
  private filterSubscription: Subscription | null = null; // შეცდომის შესწორება

  cartItemCount: number = 0;
  page: number = 1;
  itemsPerPage: number = 6;

  caruselProducts = signal<Product[]>([]);


  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private cartService: CartService,
    private searchService: SearchService,
  ) {}

  ngOnInit() {

    // filtered products
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      // console.log('HomeComponent received all products:', this.products);

      // Check if there are already filtered products in the service
      this.filteredProducts = this.filterService.getFilteredProducts();
      // console.log('HomeComponent received filtered products:', this.filteredProducts);

      // If no filtered products, set all products to filtered
      if (!this.filteredProducts.length) {
        this.filteredProducts = [...this.products];
      }

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
        this.filteredProducts = filtered;
        // console.log('Filtered products updated:', this.filteredProducts);
      });
    });




    // search
    this.searchService.searchQuery$.subscribe(query => {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    });


    // carusel
    this.productService.getProductCarusel()
      .subscribe((data) => {
        this.caruselProducts.set(data);
    });
  }



  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  // Example of how to apply a filter or change data
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products, price);
    this.filterService.setFilteredProducts(filtered);  // Set filtered products in the service
  }



  // cart
  addToCart(product: any): void {
    this.cartService.addToCart(product); // პროდუქტის კალათაში დამატება
    this.cartItemCount = this.cartService.getCartItems().length;
  }
}
