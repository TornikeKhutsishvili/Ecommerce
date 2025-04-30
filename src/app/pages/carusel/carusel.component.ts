import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, signal, Signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../product.interface';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.css']
})
export class CaruselComponent implements OnInit {

  @Input() products: Product[] = [];
  currentIndex = signal(0);

  constructor() {}

  nextSlide() {
    this.currentIndex.set((this.currentIndex() + 1) % this.products.length);
  }

  prevSlide() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.products.length) % this.products.length
    );
  }

  currentProduct: Signal<Product | null> = computed(() =>
    this.products.length > 0 ? this.products[this.currentIndex()] : null
  );

  ngOnInit() {
    // console.log(this.products);
  }
}
