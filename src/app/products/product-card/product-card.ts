import { Product } from './../product';
import { Component, input, output} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';


@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatRippleModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  readonly product = input.required<Product>();
  readonly addButtonLabel = input('Add to Cart');
  readonly deleteButtonLabel = input('Delete from Cart');
  readonly addToCart = output<Product>();
  readonly deleteFromCart = output<Product>();




  protected onAddToCard() {
    this.addToCart.emit(this.product());
  }

  protected onDeleteFromCart() {
    this.deleteFromCart.emit(this.product());
  }

}
