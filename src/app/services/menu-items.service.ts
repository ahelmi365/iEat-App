import { menuItem } from './../models/menu_items_model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {


  // private menuItem: menuItem[] = [];
  // private menuItems = new BehaviorSubject<menuItem[]>([]);
  // private menuItems$ = this.menuItems.asObservable();

  private allMenuItems: menuItem[] = [];
  private menuItems$ = new BehaviorSubject(this.allMenuItems);


  private FilteredCategoryList = new BehaviorSubject<string[]>([]);
  private FilteredCategoryListObs = this.FilteredCategoryList.asObservable();

  private inCartItemsIds = new BehaviorSubject<Number[]>([]);
  private inCartItemsIds$ = this.inCartItemsIds.asObservable();

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
      // A client side or Netowrk error
    } else {
      // Backend returned unsucessfull response code
      console.error('Error status:', error.status);
      console.error('Error details:', error.error);
    }
    // return throwError('Something bad happened, please try again!');
    return throwError(() => new Error('Something bad happened, please try again!'));
  };

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
    return this.http.get<menuItem[]>('assets/data/menu_items.json').pipe(catchError(this.handleError));
  }




  getAllIJSONtems() {
    this.http.get<menuItem[]>('assets/data/menu_items.json').subscribe((res) => {
      this.allMenuItems = res;
      console.log(res);
      console.log(this.allMenuItems);
      // this.menuItems$.next(this.allMenuItems);
      // console.log( this.menuItems$);


    });

  }

  getAllItems() {
    this.getAllIJSONtems();
    console.log(this.allMenuItems);

    return this.allMenuItems;
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

  updateItemQuantity(menuItemId: any, itemNewQuantity: Number) {
    //   const indexOfItem = this.cartDataList.findIndex(item => item.id === menuItemId);
    //   this.cartDataList.forEach(item => {
    //     if (item.id == menuItemId) {
    //       item.itemQuantity = itemNewQuantity;
    //     }
    //   });
    //   this.cartDataListObs.next(this.cartDataList);
    //   this.calculateCartTotalUSD();
  }

}
