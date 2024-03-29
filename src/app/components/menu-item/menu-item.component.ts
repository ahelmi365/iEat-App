import { Component, OnInit, Input } from '@angular/core';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: menuItem;
  private selectedMenuItems: menuItem[] = [];
  showItemMoreDetails: boolean = false;


  constructor(protected menuItemsService: MenuItemsService, protected cartItemsService: CartItemsService) {
    this.menuItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      itemQuantity: 0,
      category: [],
      inCart: false
    }
  }


  ngOnInit(): void {

  }

  showMoreDetails() {
    this.showItemMoreDetails = true;
  }

  hideItemDetails(){
    this.showItemMoreDetails = false;
    // const itemDetailsDiv = document.getElementById('item-more-details') as HTMLElement;
    // itemDetailsDiv.style.display='none';

  }


}





