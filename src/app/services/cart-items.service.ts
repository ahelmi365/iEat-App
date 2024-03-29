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

  private cardTotalUSD = 0;
  private cardTotalUSDObs = new BehaviorSubject(this.cardTotalUSD);

  private menuItemInCartId: any[] = [];
  private menuItemInCartIdObs = new BehaviorSubject(this.menuItemInCartId);


  constructor() { }


  getItemQuantity(menuItemId:any){
    let itemQuantity:Number = 1;
    this.cartDataList.forEach((element: any) => {
      if (element.id == menuItemId) {
        itemQuantity = element.itemQuantity;
      }
    });
    return itemQuantity;

  }
  addToCart(menuItem: menuItem) {
    // check if the item is already in the Cart
    const itemFound: boolean = this.cartDataList.some((el: any) => el.id === menuItem.id);

    if (itemFound) {

      this.cartDataList.forEach((cartItem: any) => {
        if (cartItem.id == menuItem.id) {
          cartItem.itemQuantity = menuItem.itemQuantity;
        }
      });
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

  getFinalCartTotalUSD(){
    return this.cardTotalUSD;
  }
  getCartItemsNumber() {
    return this.cartItemsNumberObs.asObservable();
  }
  getFinalCartItemsNumber(){
    return this.cartItemsNumber;
  }
  calculateCartTotalUSD() {
    this.cardTotalUSD = 0;

    // using reduce high order function (HOF)
    this.cardTotalUSD = this.cartDataList.reduce((prev, curr) => { return prev + curr.price * Number(curr.itemQuantity) }, 0)
    this.cardTotalUSDObs.next(+(this.cardTotalUSD.toFixed(2)));

  }

  DeleteCartItem(menuItem: any) {
    const itemIndexToRemove = this.cartDataList.findIndex(item => item.id === menuItem.id);

    this.cartDataList.splice(itemIndexToRemove, 1);
    this.cartDataListObs.next(this.cartDataList);
    this.calculateCartTotalUSD();

    this.cartItemsNumber -= 1;
    this.cartItemsNumberObs.next(this.cartItemsNumber);

  }


  setInCartIdOnDelete(menuItemId: any) {
    const itemIndexToRemove = this.menuItemInCartId.indexOf(menuItemId);
    this.menuItemInCartId.splice(itemIndexToRemove, 1);
    this.menuItemInCartIdObs.next(this.menuItemInCartId);
  }

  setInCartIdOnAdd(menuItemId: any) {
    this.menuItemInCartId.unshift(menuItemId);
    this.menuItemInCartIdObs.next(this.menuItemInCartId);
  }


  getInCartId() {
    // console.log( this.menuItemInCartId);
    return this.menuItemInCartIdObs.asObservable();
  }

  updateItemQuantity(menuItemId: any, itemNewQuantity: Number) {
    const indexOfItem = this.cartDataList.findIndex(item => item.id === menuItemId);
    this.cartDataList.forEach(item => {
      if (item.id == menuItemId) {
        item.itemQuantity = itemNewQuantity;
      }
    });
    this.cartDataListObs.next(this.cartDataList);
    this.calculateCartTotalUSD();

  }

  clearCartList() {
    this.cartDataList = [];
    this.cartDataListObs.next(this.cartDataList);

    this.cartItemsNumber = 0;
    this.cartItemsNumberObs.next(this.cartItemsNumber);

    this.cardTotalUSD = 0;
    this.cardTotalUSDObs.next(this.cardTotalUSD);

    this.menuItemInCartId=[];
    this.menuItemInCartIdObs.next(this.menuItemInCartId);
  }
}
