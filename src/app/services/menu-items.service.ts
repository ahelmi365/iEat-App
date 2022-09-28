import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject } from 'rxjs';
import { menuItem } from '../models/menu_items_model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  private menuItems: menuItem[] = [];
  private menuItemsObs = new BehaviorSubject<menuItem[]>([]);

  private FilteredCategoryList = new BehaviorSubject<string[]>([]);
  private FilteredCategoryListObs = this.FilteredCategoryList.asObservable();


  checkedFilterItems: string[] = [];

  // allMenuItems!: Observable<menuItem[]>;
  itemQuanitity: number = 1;

  constructor(private http: HttpClient) { }

  getCheckedFilter(): Observable<string[]> {
    return this.FilteredCategoryListObs;
  }

  setCheckedFilter(newFilteredCategoryList: string[]) {
    this.FilteredCategoryList.next(newFilteredCategoryList);
  }

  getMenuItems(): Observable<menuItem[]> {
    return this.http.get<menuItem[]>('assets/data/menu_items.json');
  }

  descreaseItemAmount() {
    this.itemQuanitity--;
  }

  indreaseItemAmount() {
    this.itemQuanitity++;
  }

  getIntersection(listOne: string[], listTwo: string[]): boolean {
    const intersection: string[] = [];
    for (const item of listOne) {
      if (listTwo.includes(item)) {
        intersection.push(item);
      }
    }

    return intersection.length > 0;
  }

  getIntersection_2(listOne: [], listTwo: string[]): boolean {
    const set1 = new Set(listOne);
    const set2 = new Set(listTwo);

    const intersection = [...set1].filter(
      element => set2.has(element)
    );
    return intersection.length > 0;
  }

}
