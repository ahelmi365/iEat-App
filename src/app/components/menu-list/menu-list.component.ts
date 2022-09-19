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

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemsService.getMenuItems().subscribe(res => {
      this.menuItems = res;

      // for (const key in res) {
      //   let itemCat: string[] = res[key].category;
      //   console.log(itemCat.includes('breakfast'));
      //   if (itemCat.includes('lunch')) {
      //     this.menuItems.push(res[key]);
      //   }
      // }

    });
  }


  ngOnDestroy(): void {
    this.menuItemSubscription.unsubscribe();
  }

}
