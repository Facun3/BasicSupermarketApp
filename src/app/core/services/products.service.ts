import { computed, effect, Injectable, signal } from '@angular/core';
import { Product } from '@app/interfaces/product.interface';
import axios, { AxiosInstance } from 'axios';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProductFilter {
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

  // Signals
  private _filter = signal<ProductFilter>({});

  private _products = signal<Product[]>([]);
  private _totalProducts = signal<number>(0);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly products = computed(() => this._products());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly totalProducts = computed(() => this._totalProducts());

  constructor(private router: Router, private route: ActivatedRoute) {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    this.loadFiltersFromUrl();

    effect(() => {
      const filter = this._filter();
      if (filter.page === 1) {
        this.updateUrlParams(filter);
        this.search(filter, false);
      }
    });
  }

  private search(filter: ProductFilter, append: boolean) {
    this._loading.set(true);
    const params = this.cleanFilter(filter);

    this.axiosInstance
      .get('/product', { params })
      .then((response) => {
        if (response.status === 200) {
          const newProducts = response.data.result;
          this._totalProducts.set(response.data.total);

          if (append) {
            this._products.update((current) => [...current, ...newProducts]);
          } else {
            this._products.set(newProducts);
          }
        }
      })
      .catch((error) => {
        console.error('API ERR: ', error);
        this._error.set(error.message);
      })
      .finally(() => {
        this._loading.set(false);
      });
  }

  loadMoreProducts() {
    if (this._loading() || this._products().length >= this._totalProducts())
      return;

    const nextPage = (this._filter().page || 1) + 1;

    this._filter.update((current) => ({ ...current, page: nextPage }));

    this.search({ ...this._filter(), page: nextPage }, true);
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

  private loadFiltersFromUrl() {
    this.route.queryParams.subscribe((params) => {
      const filter: ProductFilter = {
        name: params['name'],
        page: params['page'] ? Number(params['page']) : undefined,
        pageSize: params['pageSize'] ? Number(params['pageSize']) : undefined,
        category: params['category'] ? Number(params['category']) : undefined,
        minPrice: params['minPrice'] ? Number(params['minPrice']) : undefined,
        maxPrice: params['maxPrice'] ? Number(params['maxPrice']) : undefined,
      };

      this._filter.set(filter);
    });
  }

  private updateUrlParams(filter: ProductFilter) {
    const queryParams = this.cleanFilter(filter);
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
