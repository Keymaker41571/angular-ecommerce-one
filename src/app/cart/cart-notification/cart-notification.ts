import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart-notification',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatIcon
],
  templateUrl: './cart-notification.html',
  styleUrl: './cart-notification.scss',
})
export class CartNotification {
  protected readonly message = inject<string>(MAT_DIALOG_DATA);
}
