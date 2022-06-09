import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  createProduct(product: Product) {
    return this.http.post<any>("http://localhost:8080/products/", product)
  }

  updateProduct(product: Product) {
    return this.http.put("http://localhost:8080/products/", product)
  }

  getProductList() {
    return this.http.get("http://localhost:8080/products")
  }

  deleteProduct(id: number) {
    return this.http.delete("http://localhost:8080/products/" + id)
  }

}
