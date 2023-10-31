import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {Product} from "../product";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private productService :ProductService) {
  }
  onSubmit(form :NgForm){
    const product :Product ={
      name : form.value.name,
      price : form.value.price,
      psc : form.value.psc,
    }

    this.productService.addProduct(product)
  }

}
