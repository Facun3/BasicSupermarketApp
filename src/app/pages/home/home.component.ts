import { Component, computed, inject } from '@angular/core';
import { CategoriesService } from '@app/core/services/categories.service';
import { NgFor } from '@angular/common';

interface Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
  children: Category[];
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected categoriesService = inject(CategoriesService);
  categories = this.categoriesService.categories;

  structuredCategories = computed(() => {
    const categoryMap = new Map<number, Category>();
    const allCategories = this.categories().map((cat) => ({
      ...cat,
      children: [] as Category[],
    }));
    allCategories.forEach((cat) => {
      categoryMap.set(cat.id, cat);
    });

    return allCategories.filter((cat) => {
      if (cat.parentId !== null) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(cat);
        }
        return;
      }
      return true;
    });
  });
}
