import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ProductsService } from '@app/core/services/products.service';
import { Product } from '@app/interfaces/product.interface';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-list',
  imports: [ItemCardComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  public productsService = inject(ProductsService);

  items = input.required<Product[]>();
  emptyMsg: string = ' No results found';

  isLoadingProducts = this.productsService.loading;
}
