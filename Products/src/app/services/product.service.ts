import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

const API = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.http.get<any>(`${API}/get-all-products`);
  }

  public removeProduct(productId: number) {
    return this.http.post<any>(`${API}/remove-product`, { productId: productId });
  }

  public getNextId() {
    return this.http.get<any>(`${API}/get-next-id`);
  }

  public addProduct(product: Product) {
    return this.http.post<any>(`${API}/add-product`, { product: product });
  }

  public updateProduct(product: Product) {
    return this.http.post<any>(`${API}/update-product`, { product: product });
  }
}
