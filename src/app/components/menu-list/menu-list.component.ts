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

  testFilter='all';

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemsService.getMenuItems().subscribe(res => {
      this.menuItems = res;
    });

    this.menuItemsService.gettestFilter().subscribe(newVal=>{
      this.testFilter = newVal;
    })
    console.log(this.testFilter);

  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,

    })
  }


  ngOnDestroy(): void {
    this.menuItemSubscription.unsubscribe();
  }

}
