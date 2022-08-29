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

    // const item_quant = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
    // if (Number(item_quant.value) <= 1) {
    //   item_quant.value = "1";
    //   console.log('Cannot use negative values');
    //   return;
    // } else {
    //   item_quant.value = String(Number(item_quant.value) - 1);
    //   console.log(item_quant.value);
    // }

    const item_quant = this.getItemQuant();
    if (Number(item_quant.value) <= 1) {
      item_quant.value = "1";
      // console.log('Cannot use negative values');
      return;
    } else {
      item_quant.value = String(Number(item_quant.value) - 1);
      // console.log(item_quant.value);
    }
  }
  onPlusClick(event: any) {
    // console.log(this.menuItem);

    // const item_quant = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
    const item_quant = this.getItemQuant();
    item_quant.value = String(Number(item_quant.value) + 1);
    // console.log(item_quant.value);
  }

  getItemQuant(){
    const item_quant = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
    return (item_quant);
  }
}
