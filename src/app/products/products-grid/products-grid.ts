import { ProductService } from './../../services/product-service';
import { CartService } from '../../services/cart-service';
import { Product } from '../product';
import { ProductCard } from './../product-card/product-card';
import { Component, computed, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../pagination/pagination';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { CartNotification } from '../../cart/cart-notification/cart-notification';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    Pagination,
    MatIcon,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid implements OnInit {
  // this creates a writable signal that initiates the value to an empty search
  // reference value is only readable

  readonly pageSize = signal(25);
  currentPage = signal(1);

  private dialog = inject(MatDialog);
  private productService = inject(ProductService);

  private readonly destroyRef = inject(DestroyRef);
  protected readonly searchTerm = signal('');
  protected readonly totalPage = computed(() =>
    Math.ceil(this.filteredProducts().length / this.pageSize()),
  );

  protected readonly paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  protected readonly cartService = inject(CartService);
  products = signal<Product[]>([]);
  // because we only make a reference to the signal in the template
  // read only mean that the value is being changed not the reference to object (signal)

  protected readonly filteredProducts = computed(() => {
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

  protected onPageChanged(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

  protected clearSearch() {
    this.searchTerm.set('');
  }

  protected onAddToCart(product: Product): void {
    this.cartService.addToCart(product);

    this.dialog.open(CartNotification, {
      data: `${product.name} added to cart!`,
      width: '450px',
      height: '350px',
      maxWidth: '90vw',
      panelClass: 'cart-notification-dialog',
    });
  }

  protected onDeleteFromCart(product: Product): void {
    this.cartService.removeFromCart(product);

    this.dialog.open(CartNotification, {
      data: `${product.name} removed from cart!`,
      width: '450px',
      height: '350px',
      maxWidth: '90vw',
      panelClass: 'cart-notification-dialog',
    });
  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => this.products.set(products));
  }
}

/*
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }
  */

/*
  ngOnDestroy() {
    this.products().unsubscribe();

  }
  */

/*
  private cartService!: CartService;

  ProductGrid(CartService: CartService) {
    this.cartService = CartService;
  }
  */

/*
  protected trimSearch() {
    // this how we update an existing signal by using the update method to get its
    // current value, and from the current value we can computer and calculate a secondary
    // value and update the existing signal
    this.searchTerm.update((value => value.trim()));
  }
    */

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
*/
