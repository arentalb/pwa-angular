import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../service/product.service";
import {DexieService} from "../service/dexie/dexie.service";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
  products :Product[] = []

  constructor(private productService :ProductService , private dexieService: DexieService) {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
  }

  checkOnlineStatus() {
    if (navigator.onLine) {
      console.log("user online ")
      this.getAllProducts()
    } else {
      console.log("user offline  ")
      this.getProductFromDexie()
    }
  }
  getAllProducts (){
    this.productService.getAllProducts().subscribe((allProducts)=>{
      console.log('Products fetched from Server');
      this.products = allProducts
      this.addProductsToDexie(allProducts)
    })
  }
  getProductFromDexie() {
    this.dexieService.getAllProducts().then((data) => {
      console.log('Products fetched from Dexie');
      this.products = data
    });
  }


  addProductsToDexie(products: Product[]) {
    this.deleteAllPrdouctsFromDexie();
    console.log("all data in storeProduct deleted  ")
    this.dexieService.addAllProducts(products).then(() => {
      console.log('all products stored in the Dexie storeProduct ');
    });
  }
  deleteAllPrdouctsFromDexie(){
    this.dexieService.deleteAllPrducts()
  }
}
