import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  selectedMenuItems: menuItem[] = [];
  cartTotalUSD = 0;
  cartItemsNumber = 0;

  constructor(protected cartItemsServic: CartItemsService) { }

  ngOnInit(): void {

    this.cartItemsServic.getcartDataList().subscribe((menuItem) => {
      this.selectedMenuItems = menuItem;
      // console.log(this.selectedMenuItems );
    });
    this.cartItemsServic.getcartTotalUSD().subscribe(totalCart => {
      this.cartTotalUSD = Number(totalCart);
    })

    this.cartItemsServic.getCartItemsNumber().subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    })

  }

  onDeleteCartItem(menuItem: any) {
    // console.log(menuItem);
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

  // recalculateCartTotal(menuItemId: any) {
  //   // console.log('cart input changed');
  //   // console.log(menuItemId);
  //   // console.log(this.selectedMenuItems.filter(item=>item.id == menuItemId));


  //   this.cartItemsServic.calculateCartTotalUSD();
  //   this.cartItemsServic.getcartTotalUSD();
  //   this.cartTotalUSD = this.cartItemsServic.cardTotalUSD;
  //   // console.log(this.cartTotalUSD );
  //   // console.log(this.cartItemsServic.cardTotalUSD);


  // }

  onUpdateItemQuantity(menuItemId:any, itemNewQuantity:Number){
    // console.log(itemNewQuantity);

    this.cartItemsServic.updateItemQuantity(menuItemId, itemNewQuantity);
    // let chItem = this.selectedMenuItems.filter(item=>item.id ==menuItemId);
    // console.log(chItem);

  }
  ngOnDestroy() {
    // this.
  }


}
