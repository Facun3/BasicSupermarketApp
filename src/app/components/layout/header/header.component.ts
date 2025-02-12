import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { SearchBarComponent } from '@app/components/search-bar/search-bar.component';
import { CartComponent } from '../../cart/cart.component';
import { CategoriesService } from '@app/core/services/categories.service';
import { ProductsService } from '@app/core/services/products.service';
@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categories = inject(CategoriesService).categories;
  productsService = inject(ProductsService);

  onSelectCategory(categoryId: number) {
    this.productsService.updateFilter({ category: categoryId });
  }
}
