import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { FilterService } from './services/filter.service';
import { SearchService } from './services/search.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-app';

  items: any[] = [];
  filteredItems: any[] = [];
  priceFilter: number = 0; // ფასის ფილტრი
  filteredProducts: any[] = []; // ფილტრირებული პროდუქტები
  allProducts: any[] = []; // ყველა პროდუქტი

  constructor(
    private filterService: FilterService,
    private searchService: SearchService,
    private productService: ProductService
  ){}


  ngOnInit() {
    this.productService.getProducts().subscribe((data:any) => {
      this.items = data;
      this.filteredItems = data;
      this.allProducts = data;
      this.filteredProducts = [...this.allProducts]; // საწყისი მნიშვნელობა
    });
    this.filterService.filteredProducts$.subscribe((products) => {
      this.filteredProducts = products;
      // console.log('Filtered Products:', products); // Log to check the products
    });
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.filteredItems = this.searchService.search(query, this.items);
    this.applyFilters(); // ფილტრების გამოყენება
  }

  onFilterChange(event: any) {
    this.priceFilter = event.target.value;
    this.applyFilters(); // ფილტრების გამოყენება ფასის მიხედვით
  }

  applyFilters() {
    let filtered = this.items;

    // ფასის ფილტრის გამოყენება
    if (this.priceFilter > 0) {
      filtered = this.filterService.filterByPrice(filtered, this.priceFilter);
    }

    // საძიებო სიტყვაზე ფილტრაცია
    this.filteredItems = filtered;
  }



  applyFilter(filteredProducts: any[]) {
    // console.log("✅ AppComponent received filtered products:", filteredProducts);
    this.filteredProducts = filteredProducts;
    this.filterService.setFilteredProducts(filteredProducts); // მონაცემების შენახვა სერვისში
  }
}
