import { Injectable } from '@angular/core';
import Dexie from "dexie";
import {Product} from "../../product";

@Injectable({
  providedIn: 'root'
})
export class DexieService {

  private db: Dexie  ;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = new Dexie('MyProductDB');

    this.db.version(1).stores({
      storeProducts: '++id, name, price, psc',
      storeNewProducts: '++id, name, price, psc',

    });

  }
  async getAllProducts() {
    return this.db.table('storeProducts').toArray();
  }
  async getAllNewProducts() {
    return this.db.table('storeNewProducts').toArray();
  }

  async addAllProducts(products: Product[]) {
    return this.db.table('storeProducts').bulkAdd(products);
  }

  async addNewProductToProductDatabase(products: Product) {
    return this.db.table('storeProducts').add(products).then(()=>{
      console.log("product added to the product database ")
    });
  }
  async addNewProductToNewProductDatabase(products: Product) {
    return this.db.table('storeNewProducts').add(products).then(()=>{
      console.log("product added to the new product database ")
    });
  }
  async isThereAnyNewData() {
    const count:number = await this.db.table('storeNewProducts').count();
    console.log("number of unsynced data " + count)
    return count > 0;
  }
  deleteAllPrducts(){
    this.db.table("storeProducts").clear()
  }
  deleteAllNewPrducts(){
    console.log(" all products is deleted inside the dexie service ")
    this.db.table("storeNewProducts").clear()

  }
}
