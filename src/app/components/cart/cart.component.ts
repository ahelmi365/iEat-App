import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   selectedMenuItems:menuItem[]= [];




  constructor(protected cartItemsServic: CartItemsService) { }

  ngOnInit(): void {

    this.cartItemsServic.getcartDataList().subscribe((menuItem)=>{
      this.selectedMenuItems = menuItem;
      console.log(this.selectedMenuItems );
    })


  }
}
