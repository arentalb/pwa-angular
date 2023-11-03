import { Injectable } from '@angular/core';
import {ProductService} from "../product.service";
import {DexieService} from "./dexie.service";

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private dexieService: DexieService, private productService: ProductService) {
  }
  async sync() {
    if (navigator.onLine) {
      console.log('User is online. Starting data synchronization.');
      const offlineProducts = await this.dexieService.getAllNewProducts();
      const transformedProducts = offlineProducts.map((product) => {
        return {
          name: product.name,
          price: parseFloat(product.price),
          psc: product.psc,
        };
      });

      for (const product of transformedProducts) {
        this.productService.addProduct(product)
        .subscribe(() => {
          console.log("sync " + product )
        });
      }
      console.log("all product in storeNewProducts deleted ")
      this.dexieService.deleteAllNewPrducts()
    }
  }
}
