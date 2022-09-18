import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { menuItem } from '../models/menu_items_model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartDataList: menuItem[] = [];
  private cartDataListObs = new BehaviorSubject<menuItem[]>([]);
  private cartNumberItems = 0;

  cardTotalUSD=0;
  private cardTotalUSDObs = new BehaviorSubject(observable);


  constructor() { }

  addToCart(menuItem: menuItem) {
    // check if the item is already in the Cart
    const itemFound: boolean = this.cartDataList.some((el: any) => el.id === menuItem.id);

    if (itemFound) {
      console.log(this.cartDataList);
      this.calculateCartTotalUSD();
      console.log(this.cartDataList[0].itemQuantity);

      return
    } else {
      this.cartDataList.unshift(menuItem);
      this.cartDataListObs.next(this.cartDataList);

    }
    this.calculateCartTotalUSD();
  }

  getcartDataList() {
    return this.cartDataListObs.asObservable();
  }
  getcartTotalUSD(){
    return this.cardTotalUSDObs.asObservable();
  }

  calculateCartTotalUSD(){
    this.cardTotalUSD=0;
    // using for loop
    // for (const item of this.cartDataList) {
    //   this.cardTotalUSD+= item.price * Number(item.itemQuantity);
    // }

    // using reduce high order function
    this.cardTotalUSD = this.cartDataList.reduce((prev,curr)=> {return prev + curr.price *  Number(curr.itemQuantity)},0)
    this.cardTotalUSDObs.next(String(this.cardTotalUSD.toFixed(2)));

    // console.log(this.cardTotalUSD.toFixed(2));

  }

  DeleteCartItem(menuItem:any){
  const itemIndexToRemove = this.cartDataList.findIndex(item=>item.id === menuItem.id)
    this.cartDataList.splice(itemIndexToRemove,1);
    this.cartDataListObs.next(this.cartDataList);
    this.calculateCartTotalUSD();

  }
}
