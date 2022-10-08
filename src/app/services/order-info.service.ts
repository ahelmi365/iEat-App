import { OrderInfo } from './../models/order_info_model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {
  // private orderInfo:OrderInfo[]=[];

  private orderInfo ={
    firstName:"",
    lastName:"",
    phoneNumber:"",
    orderRegion:"",
    orderAddressInDetails:"",
    orderOtherNotes:""
  };
  // private orderInfoObs = this.orderInfo.asObservable();
  private orderInfoObs =  new BehaviorSubject<OrderInfo>(this.orderInfo);
  constructor() { }


  submitOrderInfo(orderInfo: OrderInfo) {
    this.orderInfo = orderInfo;
    this.orderInfoObs.next(this.orderInfo);
  }

  // getOrderInfo() {
  //   return this.orderInfoObs;
  // }
  getFinalOrderInfo(){
    return this.orderInfo;
  }

}
