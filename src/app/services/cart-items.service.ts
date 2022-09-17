import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { menuItem } from '../models/menu_items_model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartDataList: menuItem[] = [];
  private cardDataListObs = new BehaviorSubject<menuItem[]>([]);

  cardTotalUSD=0;
  private cardTotalUSDObs = new BehaviorSubject(observable);


  constructor() { }

  addToCart(menuItem: menuItem) {
    // check if the item is already in the Cart
    const itemFound: boolean = this.cartDataList.some(
      (el: any) => el.id === menuItem.id);
    if (itemFound) {
      this.calculateCartTotalUSD();
      return
    } else {
      this.cartDataList.unshift(menuItem);
      this.cardDataListObs.next(this.cartDataList);

    }
    this.calculateCartTotalUSD();
  }

  getcartDataList() {
    // console.log(this.cardDataListObs);

    return this.cardDataListObs.asObservable();
  }
  getcartTotalUSD(){
    return this.cardTotalUSDObs.asObservable();
  }

  calculateCartTotalUSD(){
    this.cardTotalUSD=0;
    for (const item of this.cartDataList) {
      this.cardTotalUSD+= item.price * Number(item.itemQuantity);
    }
    this.cardTotalUSDObs.next(String(this.cardTotalUSD.toFixed(2)));
    console.log(this.cardTotalUSD.toFixed(2));

  }
}
