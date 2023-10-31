import { Component } from '@angular/core';
import {Product} from "../product";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent {
  products :Product[] = []

}
