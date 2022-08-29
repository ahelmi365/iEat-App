import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemsService } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuItems:menuItem[]= [];
  menuItemSubscription:Subscription = new Subscription();

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemsService.getMenuItems().subscribe(res=>{
      this.menuItems = res;
    })
  }

}
