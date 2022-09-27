import { MenuItemsService } from './../../services/menu-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-plus-minus-item',
  templateUrl: './plus-minus-item.component.html',
  styleUrls: ['./plus-minus-item.component.css']
})
export class PlusMinusItemComponent implements OnInit {
  @Input() menuItem: menuItem;
  constructor(protected menuItemsService: MenuItemsService, protected cartItemsService: CartItemsService) {
    this.menuItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      itemQuantity: 0,
      category: []
    }
  }

  ngOnInit(): void {
  }


  onMinusClick(event: any) {
    const item_quant = this.getItemQuant();
    if ((item_quant.valueAsNumber) <= 1) {
      item_quant.valueAsNumber = 1;
      // console.log('Cannot use negative values');
      return;
    } else {
      item_quant.valueAsNumber = item_quant.valueAsNumber - 1;
    }
  }
  onPlusClick(event: any) {
    // console.log(this.menuItem);
    const item_quant_input = this.getItemQuant();
    item_quant_input.valueAsNumber = item_quant_input.valueAsNumber + 1;
  }


  getItemQuant() {
    const item_quant_input = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
    return (item_quant_input);
  }

  // on click on Add button
  onAddToCart(event: any, itemQuantity: Number) {
    // console.log(this.menuItem);
    this.menuItem.itemQuantity = itemQuantity;
    this.cartItemsService.addToCart(this.menuItem);

    // console.log(event.target);
    event.target.textContent = "Update";
    event.target.classList.remove('btn-success');
    event.target.classList.add('btn-primary');


  }


}
