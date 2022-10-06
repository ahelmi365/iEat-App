import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuFilteringComponent } from './components/menu-filtering/menu-filtering.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PlusMinusItemComponent } from './components/plus-minus-item/plus-minus-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CartComponent,
    ConfirmationComponent,
    MenuListComponent,
    MenuItemComponent,
    AddToCartComponent,
    MenuFilteringComponent,
    PlusMinusItemComponent,
    FooterComponent,
    BuyNowComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    // TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
