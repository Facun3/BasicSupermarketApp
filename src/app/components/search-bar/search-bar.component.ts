import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoriesService } from '@app/core/services/categories.service';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  protected categoriesService = inject(CategoriesService);
  categories = this.categoriesService.categories;

  searchTerm = '';

  onSearch(event: Event) {
    event.preventDefault();
    console.log(this.searchTerm);
  }
}
