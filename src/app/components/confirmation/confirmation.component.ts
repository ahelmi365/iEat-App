import { takeUntil, Subject } from 'rxjs';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderInfo } from 'src/app/models/order_info_model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit , OnDestroy{
  orderInfo: OrderInfo;

  cartTotalUSD = 0;
  cartItemsNumber = 0;

  orderVATTax = .14;
  orderDeliveryFees = 1;

  orderTotal:Number = 0;

  orderDate = Date.now();

  notifier = new Subject<void>();
  constructor(protected orderInfoService: OrderInfoService, protected cartItemsService: CartItemsService) {
    this.orderInfo = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      orderRegion: "",
      orderAddressInDetails: "",
      orderOtherNotes: ""
    }
  }

  ngOnInit(): void {
    this.orderInfoService.getOrderInfo().pipe(takeUntil(this.notifier)).subscribe(orderinfo => {
      this.orderInfo = orderinfo;
      // console.log(this.orderInfo);
    });

    this.cartItemsService.getcartTotalUSD().pipe(takeUntil(this.notifier)).subscribe(totalCart => {
      this.cartTotalUSD = Number(totalCart);
      console.log( `this.cartTotalUSD ${this.cartTotalUSD}`);
      console.log(`totalcart from cart service: ${totalCart}`);

    });

    this.cartItemsService.getCartItemsNumber().pipe(takeUntil(this.notifier)).subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    });

    this.orderVATTax = +(this.cartTotalUSD *.14).toFixed(2);
    this.orderTotal = this.cartTotalUSD + this.orderVATTax + this.orderDeliveryFees;
    this.orderTotal  = +this.orderTotal.toFixed(2);
    // console.log( this.orderTotal );
    // console.log(this.orderDate);


  }



  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
    this.cartItemsService.clearCartList();
  }




}
