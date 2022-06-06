import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "../../models/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {
  }

  createStorage(data: any) {
    return this.http.post<any>("http://localhost:8080/storages", data)
  }

  updateStorage(storage: Storage) {
    return this.http.put("http://localhost:8080/storages", storage)
  }

  getStorageList() {
    return this.http.get("http://localhost:8080/storages")
  }

  getStorageById(id: number) {
    return this.http.get("http://localhost:8080/storages/" + id)
  }

  deleteStorage(id: number) {
    return this.http.delete("http://localhost:8080/storages/delete/" + id)
  }

  getStorageProducts(id: number) {
    return this.http.get("http://localhost:8080/storages/" + id + "/products/")
  }

}
