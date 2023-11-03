import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {Product} from "../product";
import {DexieService} from "../service/dexie/dexie.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private productService :ProductService, private dexieService: DexieService) {
  }
  onSubmit(form :NgForm){
    const product :Product ={
      name : form.value.name,
      price : form.value.price,
      psc : form.value.psc,
    }
    this.checkOnlineStatus(product);
  }

  checkOnlineStatus(product :Product) {
    if (navigator.onLine) {
      console.log("user online for adding new product")
      this.addProductToServer(product)
    } else {
      console.log("user offline for adding new product")
      this.addProductToDexie(product)
    }
  }

  private addProductToServer(product :Product) {
    this.productService.addProduct(product)
    this.dexieService.addNewProductToProductDatabase(product)

  }

  private addProductToDexie(product :Product) {
    this.dexieService.addNewProductToProductDatabase(product)
    this.dexieService.addNewProductToNewProductDatabase(product)

  }
}
