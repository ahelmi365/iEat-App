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
      inCart:false
    }
  }

  ngOnInit(): void {

    this.cartItemsService
    .getcartDataList()
    .pipe(takeUntil(this.notifier))
    .subscribe((menuItem) => {
      this.selectedMenuItems = menuItem;
      // console.log(this.selectedMenuItems);
    });

  // this.cartItemsService
  //   .getInCartId()
  //   .pipe(takeUntil(this.notifier))
  //   .subscribe((menuItemInCartIds) => {
  //     // console.log(menuItemId);
  //     this.inCartItemsIds = menuItemInCartIds;
  //     // console.log(this.inCartItemsIds);

  //     this.menuItems.forEach((item) => {
  //       if (this.inCartItemsIds.includes(item.id)) {
  //         console.log('this.inCartItemsIds includes id:', item.id);
  //         item.inCart = true;
  //       } else {
  //         item.inCart = false;
  //       }
  //     });
  //   });

  }


  onMinusClick(event: any) {
    if (Number(this.menuItem.itemQuantity) <= 1) {
      this.menuItem.itemQuantity=1;
      return;
    } else {
      this.menuItem.itemQuantity=Number(this.menuItem.itemQuantity)-1;
    }
    this.cartItemsService.calculateCartTotalUSD();
  }
  onPlusClick(event: any) {
    this.menuItem.itemQuantity=Number(this.menuItem.itemQuantity)+1;
    this.cartItemsService.calculateCartTotalUSD();
  }


  // getItemQuant() {
  //   const item_quant_input = <HTMLInputElement>document.getElementById("item_quant_" + this.menuItem.id)
  //   return (item_quant_input);
  // }

  // on click on Add button
  onAddToCart(event: any, itemQuantity: Number) {
    // this.menuItem.itemQuantity = itemQuantity;
    // console.log(this.menuItem.inCart );
    this.menuItem.inCart=true;
    this.cartItemsService.setInCartIdOnAdd(this.menuItem.id);
    this.cartItemsService.addToCart(this.menuItem);

  }


}
