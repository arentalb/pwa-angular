import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) { }

  
  getAllProducts (){
    return this.http.get<Product[]>("http://localhost:7000/products")
  }
}
