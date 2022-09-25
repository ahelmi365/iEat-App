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

  private testFilter = new BehaviorSubject<string>("all");
  private testFilterObs= this.testFilter.asObservable();

  gettestFilter(){
    return this.testFilterObs;
  }

  setTestFilter(newtestFilter:string){
    this.testFilter.next(newtestFilter);
  }
  checkedFilterItems: string[] = [];

  allMenuItems!: Observable<menuItem[]>;
  // private allMenuItems =new BehaviorSubject<menuItem[]>([]);

  itemQuanitity: number = 1;

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<menuItem[]> {
    return this.http.get<menuItem[]>('assets/data/menu_items.json');
  }


  // private loadFromServer() {
  //   this.allMenuItems = this.http.get('assets/data/menu_items.json').pipe(map(data => {})).subscribe(result => {
  //     console.log(result);
  // });}



  descreaseItemAmount() {
    this.itemQuanitity--;
  }

  indreaseItemAmount() {
    this.itemQuanitity++;
  }

  filterMenuItems(chckedFilterItems: string[]) {


    // const filteredMenuItems = this.menuItems.filter(item => { return item.category.includes(String(filterBy)) })
    // this.menuItems = filteredMenuItems;
    this.menuItemsObs.next(this.menuItems);
    // console.log(filterBy);

    this.menuItems = [];
    this.menuItemsObs.next(this.menuItems);
  }


  getIntersection(listOne: string[], listTwo: string[]): boolean {
    const set1 = new Set(listOne);
    const set2 = new Set(listTwo);

    const intersection = [...set1].filter(
      element => set2.has(element)
    );

    return intersection.length > 0;
  }

}
