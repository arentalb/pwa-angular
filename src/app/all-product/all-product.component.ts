import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
  products :Product[] = []

  constructor(private productService :ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts (){
    this.productService.getAllProducts().subscribe((allProducts)=>{
      this.products = allProducts
    })
  }

}
