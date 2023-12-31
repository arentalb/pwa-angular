import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../service/product.service";
import {DexieService} from "../service/dexie/dexie.service";
import {SyncService} from "../service/dexie/sync.service";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService, private dexieService: DexieService, private syncService: SyncService) {
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

  getAllProducts() {
    this.dexieService.isThereAnyNewData().then((check) => {
      if (check) {
        let accept = confirm('Do you want to sync data?');
        if (accept) {
          this.syncAndFetch()
        } else {
          this.onlyFetch()
        }
      } else {
        this.onlyFetch()
      }
    })

  }

  onlyFetch() {
    this.productService.getAllProducts().subscribe((allProducts) => {
      console.log('Products fetched from Server');
      this.products = allProducts
      this.addProductsToDexie(allProducts)
    })
    console.log('Data sync cancelled by user.');
  }

  syncAndFetch() {
    console.log("User wants to sync");
    this.syncService.syncData().then(() => {
      this.productService.getAllProducts().subscribe((allProducts) => {
        console.log('Products fetched from Server');
        this.products = allProducts;
        this.addProductsToDexie(allProducts);
        this.dexieService.deleteAllNewPrducts();
      });
    });
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
