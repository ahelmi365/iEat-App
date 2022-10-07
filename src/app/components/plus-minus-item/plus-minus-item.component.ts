import { MenuItemsService } from './../../services/menu-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-plus-minus-item',
  templateUrl: './plus-minus-item.component.html',
  styleUrls: ['./plus-minus-item.component.css']
})
export class PlusMinusItemComponent implements OnInit {
  @Input() menuItem: menuItem;
  selectedMenuItems: menuItem[] = [];
  inCartItemsIds: any[] = [];
  notifier = new Subject<void>();

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

    this.cartItemsService
      .getcartDataList()
      .pipe(takeUntil(this.notifier))
      .subscribe((cartItem) => {
        this.selectedMenuItems = cartItem;
        // console.log(this.selectedMenuItems);
        // console.log(this.menuItem);
        // for (const cartItem in this.selectedMenuItems) {
        //   for (const menuItem in this.menuItem) {
        //     if (menuItem.id == ) {

        //     }

        //   }
        // }


      });
  }


  onMinusClick(event: any) {
    if (Number(this.menuItem.itemQuantity) <= 1) {
      this.menuItem.itemQuantity = 1;
      return;
    } else {
      this.menuItem.itemQuantity = Number(this.menuItem.itemQuantity) - 1;
    }
    this.cartItemsService.calculateCartTotalUSD();
  }


  onPlusClick(event: any) {
    this.menuItem.itemQuantity = Number(this.menuItem.itemQuantity) + 1;
    this.cartItemsService.calculateCartTotalUSD();
  }


  onMinusClick2(itemId: any) {

  }

  onPlusClick2(itemId: any) {

  }

  onUpdateItemQuantity(menuItemId: any, itemNewQuantity: Number) {
    this.cartItemsService.updateItemQuantity(menuItemId, itemNewQuantity);
  }


  // on click on Add button
  onAddToCart(event: any, itemQuantity: Number) {
    // this.menuItem.itemQuantity = itemQuantity;
    // console.log(this.menuItem.inCart );
    this.menuItem.inCart = true;
    this.cartItemsService.setInCartIdOnAdd(this.menuItem.id);
    this.cartItemsService.addToCart(this.menuItem);
  }

  onDeleteFromCart(menuItem: any) {
    menuItem.itemQuantity = 1;
    menuItem.inCart = false;
    this.cartItemsService.setInCartIdOnDelete(menuItem.id);
    this.cartItemsService.DeleteCartItem(menuItem);
  }


}
