import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '@app/core/services/categories.service';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { ProductsService } from '@app/core/services/products.service';
import { SpinnerComponent } from '@app/components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  imports: [ItemListComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected productsService = inject(ProductsService);
  protected categoriesService = inject(CategoriesService);

  products = this.productsService.products;
  totalProducts = this.productsService.totalProducts;
  categories = this.categoriesService.categories;
  isLoadingProducts = this.productsService.loading;

  onLoadMore() {
    this.productsService.loadMoreProducts();
  }

  hasMoreProducts() {
    return (
      this.productsService.totalProducts() >
      this.productsService.products().length
    );
  }
}
