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
export class MenuListComponent implements OnInit {
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
    // console.log('ngOnInit started');
    this.menuItemsService
      .getMenuItems()
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.menuItems = res;
        // console.log(this.menuItems);
        this.menuItems.forEach((item) => {
          item['itemQuantity'] = 1;
          item['inCart'] = false;
        });
        // console.log(this.menuItems);
      });

    this.cartItemsService
      .getCartItemsNumber()
      .pipe(takeUntil(this.notifier))
      .subscribe((cartItemnumber) => {
        this.cartItemsNumber = cartItemnumber;
      });

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

    this.cartItemsService
      .getcartDataList()
      .pipe(takeUntil(this.notifier))
      .subscribe((menuItem) => {
        this.selectedMenuItems = menuItem;
        // console.log(this.selectedMenuItems);
      });

    this.cartItemsService
      .getInCartId()
      .pipe(takeUntil(this.notifier))
      .subscribe((menuItemInCartIds) => {
        // console.log(menuItemId);
        this.inCartItemsIds = menuItemInCartIds;
        // console.log(this.inCartItemsIds);

        this.menuItems.forEach((item) => {
          if (this.inCartItemsIds.includes(item.id)) {
            console.log('this.inCartItemsIds includes id:', item.id);
            item.inCart = true;
          } else {
            item.inCart = false;
          }
        });
      });
  }

  checkIntersection(menuItemCategoryList: any): boolean {
    return this.menuItemsService.getIntersection(
      menuItemCategoryList,
      this.checkedFilterItems
    );
  }
  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
