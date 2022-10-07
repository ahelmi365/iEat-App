import {
  Component,
  OnInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { MenuItemsService } from 'src/app/services/menu-items.service';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  showFilterAside: boolean = false;
  showCartAside: boolean = false;
  cartItemsNumber = 0;
  menuItems: menuItem[] = [];
  notifier = new Subject<void>();
  checkedFilterItems = ['all'];
  selectedMenuItems: menuItem[] = [];
  inCartItemsIds: any[] = [];
  constructor(
    protected menuItemsService: MenuItemsService,
    protected cartItemsService: CartItemsService
  ) { }
  ngOnInit(): void {

    this.getCartItemsNumber();
    this.getCheckedFilterItems();
    this.getcartDataList();
    this.getInCartItemsIds();
    this.getAllMenuItems();
  }

  checkIntersection(menuItemCategoryList: any): boolean {
    return this.menuItemsService.getIntersection(
      menuItemCategoryList,
      this.checkedFilterItems
    );
  }
  showHideFilter(evt: any) {
    this.showFilterAside = evt.target.checked;
    // console.log(evt.target.checked);
    if (this.showFilterAside) {
      this.showCartAside = false;
      const chekcCartInput = <HTMLInputElement>(
        document.getElementById('show-cart')
      );
      chekcCartInput.checked = false;
    }
  }
  showHideCart(evt: any) {
    this.showCartAside = evt.target.checked;
    if (this.showCartAside) {
      this.showFilterAside = false;
      const chekcFilterInput = <HTMLInputElement>(
        document.getElementById('show-filter')
      );
      chekcFilterInput.checked = false;
    }
  }
  showMenuIteme(evt: any) {
    const chekcCartInput = <HTMLInputElement>(
      document.getElementById('show-cart')
    );
    const chekcFilterInput = <HTMLInputElement>(
      document.getElementById('show-filter')
    );
    if (chekcCartInput.checked) {
      chekcCartInput.checked = false;
      this.showCartAside = false;
    }
    if (chekcFilterInput.checked) {
      chekcFilterInput.checked = false;
      this.showFilterAside = false;
    }
    const filterAside = <HTMLDivElement>document.querySelector('.left');
    const showFilterAside = filterAside.classList.contains('showFilterAside');
    if (showFilterAside) {
      filterAside.classList.remove('showFilterAside');
    }
  }
  addDeleteButton() {
    this.menuItems.forEach((item) => {
      if (this.inCartItemsIds.includes(item.id)) {
        item.inCart = true;
      } else {
        item.inCart = false;
      }
    });
  }
  setItemQuantity() {
    this.menuItems.forEach((item) => {
      if (this.inCartItemsIds.includes(item.id)) {
        item.itemQuantity = this.cartItemsService.getItemQuantity(item.id);
      } else {
        item.itemQuantity = 1
      }
    });
  }

  getCartItemsNumber() {
    this.cartItemsService
      .getCartItemsNumber()
      .pipe(takeUntil(this.notifier))
      .subscribe((cartItemnumber) => {
        this.cartItemsNumber = cartItemnumber;
      });
  }
  getCheckedFilterItems() {
    this.menuItemsService
      .getCheckedFilter()
      .pipe(takeUntil(this.notifier))
      .subscribe((newFilteredItems) => {
        if (newFilteredItems.length == 0) {
          this.checkedFilterItems = ['all'];
        } else {
          this.checkedFilterItems = newFilteredItems;
        }
      });
  }
  getcartDataList() {
    this.cartItemsService
      .getcartDataList()
      .pipe(takeUntil(this.notifier))
      .subscribe((cartItem) => {
        this.selectedMenuItems = cartItem;
        this.updateMenuItemQuantity()
      });
  }

  updateMenuItemQuantity() {
    for (const cartItem of this.selectedMenuItems) {
      // console.log(cartItem);
      for (const menuItem of this.menuItems) {
        if (cartItem.id == menuItem.id) {
          menuItem.itemQuantity = cartItem.itemQuantity;
        }
      }
    }
  }
  getInCartItemsIds() {
    this.cartItemsService.getInCartId().pipe(takeUntil(this.notifier)).subscribe(inCartIDs => {
      this.inCartItemsIds = inCartIDs;
      // console.log(this.inCartItemsIds);
      this.addDeleteButton();
    })
  }
  getAllMenuItems() {
    this.menuItemsService
      .getMenuItems()
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.menuItems = res;
        this.menuItems.forEach((item) => {
          item['itemQuantity'] = 1;
        });
        this.addDeleteButton();
        this.setItemQuantity();
      });
  }
  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
