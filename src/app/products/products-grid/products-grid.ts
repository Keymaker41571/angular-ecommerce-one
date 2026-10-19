import { CartService } from '../../services/cart-service';
import { Product } from '../product';
import { ProductCard } from './../product-card/product-card';
import { Component, computed, signal, Injectable, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatIcon, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  // this creates a writable signal that initiates the value to an empty search
  // reference value is only readable
  protected readonly searchTerm = signal('');

  /*
  private cartService!: CartService;

  ProductGrid(CartService: CartService) {
    this.cartService = CartService;
  }
  */

  protected readonly cartService = inject(CartService);

  // because we only make a reference to the signal in the template
  // read only mean that the value is being changed not the reference to object (signal)
  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      description:
        'High-quality wireless headphones with noise cancellation and premium sound quality.',
      price: 199.99,
      originalPrice: 249.99,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      description:
        'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
      price: 299.99,
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      description: 'Compact speaker with powerful bass and 12-hour battery life.',
      price: 79.99,
      originalPrice: 99.99,
    },
    {
      id: 4,
      name: 'Mechanical Gaming Keyboard',
      description: 'Responsive mechanical keyboard with RGB lighting and customizable keys.',
      price: 89.99,
      originalPrice: 119.99,
    },
    {
      id: 5,
      name: 'Wireless Gaming Mouse',
      description: 'Lightweight wireless mouse with adjustable DPI and long battery life.',
      price: 59.99,
    },
    {
      id: 6,
      name: '27-Inch 4K Monitor',
      description:
        'Ultra-high-definition monitor with vibrant colors and a sharp, detailed display.',
      price: 349.99,
      originalPrice: 399.99,
    },
    {
      id: 7,
      name: 'Wireless Keyboard',
      description:
        'Compact wireless keyboard with quiet, responsive keys for comfortable everyday typing and productivity.',
      price: 49.99,
    },
    {
      id: 8,
      name: 'USB-C Hub',
      description:
        'Multi-port USB-C hub with HDMI output and extra USB connections for external displays and devices.',
      price: 34.99,
    },
    {
      id: 9,
      name: 'HD Webcam',
      description:
        '1080p webcam delivering clear video quality for online meetings, virtual classes, and casual streaming.',
      price: 59.99,
    },
    {
      id: 10,
      name: 'Adjustable Laptop Stand',
      description:
        'Sturdy adjustable laptop stand that raises your screen for comfortable viewing while working or studying.',
      price: 29.99,
    },

    {
      id: 11,
      name: 'Wireless Charging Pad',
      description:
        'Fast wireless charging pad with a slim design, reliable charging performance, and compatibility with supported smartphones and wireless charging devices.',
      price: 39.99,
      originalPrice: 49.99,
    },
    {
      id: 12,
      name: '4K Computer Monitor',
      description:
        'Ultra-high-definition monitor with vibrant colors, sharp image quality, and a spacious display for work and entertainment.',
      price: 349.99,
    },
    {
      id: 13,
      name: 'External SSD',
      description:
        'Portable solid-state drive offering fast file transfers, reliable storage, and plenty of space for documents, photos, and applications.',
      price: 109.99,
      originalPrice: 139.99,
    },
    {
      id: 14,
      name: 'Noise-Cancelling Headphones',
      description:
        'Comfortable over-ear headphones featuring active noise cancellation, rich audio, and long battery life for travel and everyday listening.',
      price: 149.99,
    },
  ]);

  protected readonly filterdProducts = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase().trim();
    if (!term) return this.products();

    // includse return true if searchString appears as a substring of the reseult converthing
    // this object to a string other return false
    return this.products().filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(term) ||
        product.description.toLocaleLowerCase().includes(term),
    );
  });

  protected clearSearch() {
    this.searchTerm.set('');
  }

  protected onAddToCart(product: Product): void {
    // console.log('Added to cart: ', product.name);
    this.cartService.addToCart(product);
  }

  protected onDeleteFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }
  /*
  protected trimSearch() {
    // this how we update an existing signal by using the update method to get its
    // current value, and from the current value we can computer and calculate a secondary
    // value and update the existing signal
    this.searchTerm.update((value => value.trim()));
  }
    */
}

/*
protected readonly products = signal<Product[]>([ ... ]);

protected → the property can be accessed by the class and its template,
but not generally from outside the component.

readonly → you cannot reassign the products variable itself after it's created.
You can still change the signal's value with methods like .set() or .update().

products → the variable/property name.

signal → Angular's function that creates a signal.

<Product[]> → this is a TypeScript generic type. It tells signal that its value
is an array ([]) of Product objects. Similar conceptually to Java generics like List<Product>.

[ ... ] → the actual array of Product objects being stored inside the signal.

So conceptually:

products → signal → Product[] → [Product object, Product object, Product object]
*/
