import { OrderInfo } from './../models/order_info_model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {
  // private orderInfo:OrderInfo[]=[];

  private orderInfo = new BehaviorSubject<OrderInfo>({
    firstName:"",
    lastName:"",
    phoneNumber:"",
    orderRegion:"",
    orderAddressInDetails:"",
    orderOtherNotes:""
  });
  private orderInfoObs = this.orderInfo.asObservable();
  constructor() { }


  submitOrderInfo(orderInfo: OrderInfo) {
    this.orderInfo.next(orderInfo);
  }

  getOrderInfo() {
    return this.orderInfoObs;
  }

}
