import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environement';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  

  constructor(private http:HttpClient) { }

  getAllProducts() {
     return this.http.get(environment.baseApi+'/products')
  }

  getAllCategories() {
    return this.http.get(environment.baseApi+"/products/categories")
    }
  
  getProductsByCategory(keyword:string){
    return this.http.get(`${environment.baseApi}/products/category/${keyword}`)
  }
  
  getProductsById(id:any){
    return this.http.get(`${environment.baseApi}/products/${id}`);
  }
}
