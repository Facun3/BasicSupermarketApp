import { computed, effect, Injectable, signal } from '@angular/core';
import { Product } from '@app/interfaces/product.interface';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

interface ProductFilter {
  name?: string;
  page?: number;
  pageSize?: number;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private axiosInstance: AxiosInstance;

  //Define signals
  private _filter = signal<ProductFilter>({
    page: 1,
    pageSize: 10,
    minPrice: 0,
  });

  private _products = signal<Product[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Define getters
  readonly products = computed(() => this._products());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly totalProducts = computed(() => this._products().length);

  private searchEfect = effect(() => {
    const filter = this._filter();
    this.search(filter);
  });

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private search(filter: ProductFilter) {
    this._loading.set(true);

    const params = new HttpParams({
      fromObject: this.cleanFilter(filter),
    });

    this.axiosInstance
      .get('/product', { params })
      .then((response) => {
        this._products.set(response.data);
      })
      .catch((error) => {
        console.log('API ERR: ', error);
        this._error.set(error.message);
      })
      .finally(() => {
        this._loading.set(false);
      });
  }

  loadNextPage() {
    this._filter.update((current) => ({
      ...current,
      page: current.page ? current.page + 1 : 1,
    }));
  }

  updateFilter(partialFilter: Partial<ProductFilter>) {
    this._filter.update((current) => ({
      ...current,
      ...partialFilter,
      page: 1,
    }));
  }

  private cleanFilter(filter: ProductFilter): Record<string, string> {
    return Object.entries(filter).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>);
  }
}
