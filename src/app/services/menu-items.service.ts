import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { menuItem } from '../models/menu_items_model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  private menuItems: menuItem[] = [];
  private menuItemsObs = new BehaviorSubject<menuItem[]>([]);
  itemQuanitity: number = 1;

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<menuItem[]> {
    return this.http.get<menuItem[]>('assets/data/menu_items.json');
  }

  descreaseItemAmount() {
    this.itemQuanitity--;
  }

  indreaseItemAmount() {
    this.itemQuanitity++;
  }

  filterMenuItems(filterBy: any) {


    // const filteredMenuItems = this.menuItems.filter(item => { return item.category.includes(String(filterBy)) })
    // this.menuItems = filteredMenuItems;
    this.menuItemsObs.next(this.menuItems);
    console.log(filterBy);

    this.menuItems = [];
    this.menuItemsObs.next(this.menuItems);
  }
}
