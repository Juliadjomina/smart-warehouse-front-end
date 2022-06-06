import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainpageComponent} from "./mainpage/mainpage.component";
import {StorageListComponent} from "./storage-list/storage-list.component";
import {ProductComponent} from "./product/product.component";
import {LoginComponent} from "./login/login.component";
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'storage-list', component: StorageListComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'storage/:id/products', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
