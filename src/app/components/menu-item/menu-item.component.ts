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
  private selectedMenuItems: menuItem[] = [];
  testFilter='all';

  constructor(protected menuItemsService: MenuItemsService, protected cartItemsService: CartItemsService) {
    this.menuItem = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      itemQuantity: 0,
      category:[]
    }
  }
  ngOnInit(): void {
    // subscripe on an observalble in menu-item service to change the [testFlter] value
    this.menuItemsService.gettestFilter().subscribe(newVal=>{
      this.testFilter = newVal;
    })
  }

  // getIntersection(listOne: [], listTwo: []): boolean {
  //   const set1 = new Set(listOne);
  //   const set2 = new Set(listTwo);

  //   const intersection = [...set1].filter(
  //     element => set2.has(element)
  //   );

  //   return intersection.length > 0;
  // }

  applyFilter(listA:string[], listB:string[]){

    const hasInstersect = this.menuItemsService.getIntersection(this.menuItemsService.checkedFilterItems, listB);
    console.log(hasInstersect);

  }

}
