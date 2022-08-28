import { Component, OnInit, Input, Output } from '@angular/core';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: menuItem;

  constructor(protected menuItemService: MenuItemService) {
    this.menuItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  onMinusClick(event: any) {
    console.log("minus clicked");
    console.log(event.target);
    this.menuItemService.descreaseItemAmount();
  }

  onPlusClick(event: any) {
    console.log("Plus clicked");
    console.log(event.target);

    this.menuItemService.indreaseItemAmount();
  }

}
