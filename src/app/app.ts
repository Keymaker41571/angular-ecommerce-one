import { ProductCard } from './products/product-card/product-card';
import { ProductsGrid } from './products/products-grid/products-grid';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ProductsGrid],  /* ProductCard] */
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-project-2026');
}
