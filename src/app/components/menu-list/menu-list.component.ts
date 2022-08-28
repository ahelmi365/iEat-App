import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuItems:menuItem[]= [];
  menuItemSubscription:Subscription = new Subscription();

  constructor(protected menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemService.getMenuItems().subscribe(res=>{
      this.menuItems = res;
    })
  }

}
