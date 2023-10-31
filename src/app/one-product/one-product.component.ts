import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {Product} from "../product";

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent {
  theProduct!:Product
  constructor(private productService :ProductService) {
  }
  onSubmit(form :NgForm){
     let id = form.value.id
    this.productService.getProductById(id).subscribe((product)=>{
      this.theProduct = product
    })
  }



}
