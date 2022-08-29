import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { menuItem } from '../models/menu_items_model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartDataList:menuItem[]=[];
  private cardDataListObs = new BehaviorSubject<menuItem[]>([]);

  constructor() { }

  addToCart(menuItem: menuItem){
  this.cartDataList.push(menuItem);
  this.cardDataListObs.next(this.cartDataList);

  }
  getcartDataList(){
    // console.log(this.cardDataListObs);

    return this.cardDataListObs.asObservable();
  }
}
