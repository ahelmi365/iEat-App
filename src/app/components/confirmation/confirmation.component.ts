import { takeUntil, Subject } from 'rxjs';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { OrderInfo } from 'src/app/models/order_info_model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, AfterViewInit, OnDestroy {
  orderInfo: OrderInfo;

  cartTotalUSD = 0;
  cartItemsNumber = 0;

  orderVATTax = .14;
  orderDeliveryFees = 1;

  orderTotal: Number = 0;

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
    this.getOrderInfo();
    this.getCartItemsNumber();
    this.getCartTotalUSD();
    this.calculateOrderTotal();
  }

  getOrderInfo() {
    this.orderInfo = this.orderInfoService.getFinalOrderInfo();
  }
  getCartItemsNumber() {
    this.cartItemsNumber = this.cartItemsService.getFinalCartItemsNumber();
  }
  getCartTotalUSD() {
    this.cartTotalUSD = Number(this.cartItemsService.getFinalCartTotalUSD().toFixed(2));
  }
  calculateOrderTotal() {
    this.orderVATTax = +(this.cartTotalUSD * .14).toFixed(2);
    this.orderTotal = this.cartTotalUSD + this.orderVATTax + this.orderDeliveryFees;
    this.orderTotal = +this.orderTotal.toFixed(2);
  }

  ngAfterViewInit() {
    this.cartItemsService.clearCartList();
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
