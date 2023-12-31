import { Injectable } from '@angular/core';
import {ProductService} from "../product.service";
import {DexieService} from "./dexie.service";

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private dexieService: DexieService, private productService: ProductService) {
  }
  async syncData() {
    if (navigator.onLine) {
      console.log('User is online');
      console.log("Starting data synchronization");
      const offlineProducts = await this.dexieService.getAllNewProducts();
      const transformedProducts = offlineProducts.map((product) => {
        return {
          name: product.name,
          price: parseFloat(product.price),
          psc: product.psc,
        };
      });
      const totalProducts = transformedProducts.length;
      let completed = 0;

      for (const product of transformedProducts) {
        await this.productService.addProduct(product).toPromise();
        completed++;
        const progress = Math.floor((completed / totalProducts) * 100);
        console.log(`Sync Progress: ${progress}%`);
      }
    }
    }
}
