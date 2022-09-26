import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemsService } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuItems: menuItem[] = [];
  menuItemSubscription: Subscription = new Subscription();

  checkedFilterItems = ['all'];

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemsService.getMenuItems().subscribe(res => {
      this.menuItems = res;
    });

    this.menuItemsService.getTestFilter().subscribe(newFilteredItems => {
      if (newFilteredItems.length == 0) {
        this.checkedFilterItems = ['all'];
      } else {
        this.checkedFilterItems = newFilteredItems
      }

    })
    // console.log(this.checkedFilterItems);
  }


  checkIntersection(menuItemCategoryList: any): boolean {
    return this.menuItemsService.getIntersection(menuItemCategoryList, this.checkedFilterItems)
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior:'smooth'
    })
  }


  ngOnDestroy(): void {
    this.menuItemSubscription.unsubscribe();
  }

}
