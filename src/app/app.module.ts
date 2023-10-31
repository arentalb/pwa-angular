import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';

const routers =[
  {path :"" , component : HomeComponent},
  {path :"allproducts" , component : AllProductComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllProductComponent,
    ProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
