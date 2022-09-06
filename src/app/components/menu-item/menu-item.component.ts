import { Component, OnInit, Input, Output } from '@angular/core';
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
  private selectedMenuItems:menuItem[]= [];

  constructor(protected menuItemsService: MenuItemsService, protected cartItemsService:CartItemsService) {
    this.menuItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      itemQuantity:0
    }
  }
  ngOnInit(): void {
  }
  onMinusClick(event: any) {
    const item_quant = this.getItemQuant();
    if (Number(item_quant.value) <= 1) {
      item_quant.value = "1";
      // console.log('Cannot use negative values');
      return;
    } else {
      item_quant.value = String(Number(item_quant.value) - 1);
    }
  }
  onPlusClick(event: any) {
    // console.log(this.menuItem);
    const item_quant_input = this.getItemQuant();
    item_quant_input.value = String(Number(item_quant_input.value) + 1);
  }
  getItemQuant() {
    const item_quant_input = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
    return (item_quant_input);
  }

  // on click on Add button
  onAddToCart(event:any, itemQuantity:string){
    // console.log(this.menuItem);
    this.menuItem.itemQuantity = Number(itemQuantity);
    this.cartItemsService.addToCart(this.menuItem);

  }


}
