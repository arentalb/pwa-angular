import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { OneProductComponent } from './one-product/one-product.component';
import {FormsModule} from "@angular/forms";
import { AddProductComponent } from './add-product/add-product.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const routers =[
  {path :"" , component : HomeComponent},
  {path :"allproducts" , component : AllProductComponent},
  {path :"oneproduct" , component : OneProductComponent},
  {path :"addproduct" , component : AddProductComponent},


]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllProductComponent,
    ProductComponent,
    HomeComponent,
    OneProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
