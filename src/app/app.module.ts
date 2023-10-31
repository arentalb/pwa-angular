import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllProductComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
