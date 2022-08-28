import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { MenuFilteringComponent } from './components/menu-filtering/menu-filtering.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CartComponent,
    ConfirmationComponent,
    MenuListComponent,
    MenuItemComponent,
    AddToCartComponent,
    MenuFilteringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
