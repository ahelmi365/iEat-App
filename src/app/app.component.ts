import { Component } from '@angular/core';
import { CartItemsService } from './services/cart-items.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iEat';


  constructor(protected cartItemsServic: CartItemsService) { }

  ngOnInit(): void {


  }



  ngOnDestroy(){

  }
}
