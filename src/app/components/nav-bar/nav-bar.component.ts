import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';
import { CartItemsService } from 'src/app/services/cart-items.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItemsNumber = 0;
  notifier = new Subject<void>();

  navBarItems: { navTitle: string, url: string }[] = [
    { "navTitle": 'Home', "url": '' }, { "navTitle": 'Cart', "url": '/buy-now' }, { "navTitle": 'About Us', "url": '/aboutUs' },]
  constructor(protected cartItemsService: CartItemsService) { }

  ngOnInit(): void {
    this.cartItemsService.getCartItemsNumber().pipe(takeUntil(this.notifier)).subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    });
  }
  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }


}
