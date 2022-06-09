import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "../../models/storage";
import {environment} from "../../environments/environment";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storages: string = "/storages/";
  products: string = "/products/";

  constructor(private http: HttpClient) {
  }

  createStorage(storage: Storage) {
    return this.http.post<any>(`${environment.API_BASE_URL}${this.storages}`, storage)
  }

  updateStorage(storage: Storage) {
    return this.http.put(`${environment.API_BASE_URL}${this.storages}`, storage)
  }

  getStorageList() {
    return this.http.get(`${environment.API_BASE_URL}${this.storages}`)
  }

  getStorageById(id: number) {
    return this.http.get(`${environment.API_BASE_URL}${this.storages}${id}`)
  }

  deleteStorage(id: number) {
    return this.http.delete(`${environment.API_BASE_URL}${this.storages}${id}`)
  }

  getStorageProducts(id: number) {
    return this.http.get(`${environment.API_BASE_URL}${this.storages}${id}${this.products}`)
  }

}
