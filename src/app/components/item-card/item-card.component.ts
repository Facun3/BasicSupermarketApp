import { Component, input, Input, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-item-card',
  imports: [CurrencyPipe, SlicePipe],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  item = input.required<Product>();
}
