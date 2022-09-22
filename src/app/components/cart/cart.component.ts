import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, takeUntil } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  selectedMenuItems: menuItem[] = [];
  cartTotalUSD = 0;
  cartItemsNumber = 0;
  notifier = new Subject<void>();

  constructor(protected cartItemsServic: CartItemsService) { }

  ngOnInit(): void {

    this.cartItemsServic.getcartDataList().pipe(takeUntil(this.notifier)).subscribe((menuItem) => {
      this.selectedMenuItems = menuItem;
    });
    this.cartItemsServic.getcartTotalUSD().pipe(takeUntil(this.notifier)).subscribe(totalCart => {
      this.cartTotalUSD = Number(totalCart);
    })

    this.cartItemsServic.getCartItemsNumber().pipe(takeUntil(this.notifier)).subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    })

  }

  onDeleteCartItem(menuItem: any) {
    this.cartItemsServic.DeleteCartItem(menuItem);
  }

  onMinusClick(id: any) {
    const item_quant_input = <HTMLInputElement>document.getElementById(id);
    if ((item_quant_input.valueAsNumber) <= 1) {
      item_quant_input.valueAsNumber = 1;
      return;
    } else {
      item_quant_input.valueAsNumber -= 1;
    }
  }

  onPlusClick(id: any) {
    const item_quant_input = <HTMLInputElement>document.getElementById(id);
    item_quant_input.valueAsNumber += 1;
  }


  onUpdateItemQuantity(menuItemId: any, itemNewQuantity: Number) {
    this.cartItemsServic.updateItemQuantity(menuItemId, itemNewQuantity);
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }


}
