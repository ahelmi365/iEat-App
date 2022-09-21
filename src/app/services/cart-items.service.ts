import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { menuItem } from '../models/menu_items_model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartDataList: menuItem[] = [];
  private cartDataListObs = new BehaviorSubject<menuItem[]>([]);

  private cartItemsNumber = 0;
  private cartItemsNumberObs = new BehaviorSubject(this.cartItemsNumber);

  cardTotalUSD = 0;
  private cardTotalUSDObs = new BehaviorSubject(observable);


  constructor() { }

  addToCart(menuItem: menuItem) {
    // check if the item is already in the Cart
    const itemFound: boolean = this.cartDataList.some((el: any) => el.id === menuItem.id);

    if (itemFound) {
      this.calculateCartTotalUSD();
      return
    } else {
      this.cartDataList.unshift(menuItem);
      this.cartDataListObs.next(this.cartDataList);

    }
    this.calculateCartTotalUSD();

    this.cartItemsNumber += 1;
    this.cartItemsNumberObs.next(this.cartItemsNumber);
  }

  getcartDataList() {
    return this.cartDataListObs.asObservable();
  }
  getcartTotalUSD() {
    return this.cardTotalUSDObs.asObservable();
  }
  getCartItemsNumber() {
    return this.cartItemsNumberObs.asObservable();
  }

  calculateCartTotalUSD() {
    this.cardTotalUSD = 0;

    // using reduce high order function (HOF)
    this.cardTotalUSD = this.cartDataList.reduce((prev, curr) => { return prev + curr.price * Number(curr.itemQuantity) }, 0)
    this.cardTotalUSDObs.next(String(this.cardTotalUSD.toFixed(2)));

  }

  DeleteCartItem(menuItem: any) {
    const itemIndexToRemove = this.cartDataList.findIndex(item => item.id === menuItem.id)
    this.cartDataList.splice(itemIndexToRemove, 1);
    this.cartDataListObs.next(this.cartDataList);
    this.calculateCartTotalUSD();

    this.cartItemsNumber -= 1;
    this.cartItemsNumberObs.next(this.cartItemsNumber);

  }


  updateItemQuantity(menuItemId: any, itemNewQuantity: Number) {
    const indexOfItem = this.cartDataList.findIndex(item => item.id === menuItemId);
    this.cartDataList.forEach(item => {
      if (item.id == menuItemId) {
        item.itemQuantity = itemNewQuantity;
      }
    })
    this.cartDataListObs.next(this.cartDataList);
    this.calculateCartTotalUSD();
  }
}
