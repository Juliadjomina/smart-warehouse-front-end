import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: string = "/products/";

  constructor(private http: HttpClient) {
  }

  createProduct(product: Product) {
    return this.http.post<any>(`${environment.API_BASE_URL}${this.products}`, product)
  }

  updateProduct(product: Product) {
    return this.http.put(`${environment.API_BASE_URL}${this.products}`, product)
  }

  getProductList() {
    return this.http.get(`${environment.API_BASE_URL}${this.products}`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.API_BASE_URL}${this.products}${id}`)
  }

}
