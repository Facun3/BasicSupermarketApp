import { computed, Injectable, signal } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { Category } from '@app/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private axiosInstance: AxiosInstance;

  private _categories = signal<Category[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly categories = computed(() => this._categories());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.loadCategories();
  }

  loadCategories() {
    this._loading.set(true);
    this.axiosInstance
      .get('/category/all')
      .then((response) => {
        this._categories.set(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log('API ERR: ', error);
        this._error.set(error.message);
      })
      .finally(() => {
        this._loading.set(false);
      });
  }
}
