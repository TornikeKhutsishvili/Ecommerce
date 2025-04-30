import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';
import { ToggleService } from '../../services/toggle.service';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() filterApplied = new EventEmitter<any[]>();  // Emits filtered products
  products: any[] = [];

  isDarkMode: boolean;
  isMenuOpen: boolean = false; // მენიუს მდგომარეობა

  isblack:string = '';
  islight:string = '';

  sun = '☀';
  moon = '🌙';

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private searchService: SearchService,
    private themeService: ToggleService,
    private renderer: Renderer2,
  ) {
    this.isDarkMode = this.themeService.getSavedTheme() === 'dark';

    this.isblack = '#343a40';
    this.islight = '#f8f9fa';
  }

  ngOnInit(): void {
    this.updateNavbarTheme();

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getSavedTheme() === 'dark';
    this.updateNavbarTheme();
  }

  updateNavbarTheme(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.renderer.removeClass(navbar, 'navbar-light');
      this.renderer.removeClass(navbar, 'navbar-dark');

      if (this.isDarkMode) {
        this.renderer.addClass(navbar, 'navbar-dark');
      } else {
        this.renderer.addClass(navbar, 'navbar-light');
      }
    }
  }

  // menu open-close
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // search
  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchService.updateSearchQuery(query); // გადავცემთ ძიების ფრაზას სერვისში
  }

  // filter
  filterByPrice(event: any, products: any[]) {
    const value = event.target.value;

    if (!products || products.length === 0) return; // უსაფრთხოების შემოწმება

    let sortedProducts = [...products];

    if (value === 'low') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // console.log('Sorted Products:', sortedProducts); // Log the sorted products
    this.filterService.setFilteredProducts(sortedProducts); // Update the filtered products in the service
  }
}
