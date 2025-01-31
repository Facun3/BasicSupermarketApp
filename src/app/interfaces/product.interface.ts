export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
}

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}
