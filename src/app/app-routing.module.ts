import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { CartComponent } from './components/cart/cart.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:MenuListComponent},
  {path:"menu-list", component:MenuListComponent},
  {path:"cart", component:CartComponent},
  {path:"buy-now", component:BuyNowComponent},
  {path:"aboutUs", component:AboutUsComponent},
  {path:"confirm-order", component:ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
