import { Component, inject, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { ProductsService } from '@app/core/services/products.service';

@Component({
  selector: 'app-products',
  imports: [ItemListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public productsService = inject(ProductsService);

  products = this.productsService.products;

  ngOnInit(): void {
    this.productsService.updateFilter({ page: 1 });
  }
}
