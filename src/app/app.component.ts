import { Component } from '@angular/core';
import { CartItemsService } from './services/cart-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iEat';
  showFilterAside: boolean = false;
  showCartAside: boolean = false;
  cartItemsNumber = 0;

  constructor(protected cartItemsServic: CartItemsService) { }

  ngOnInit(): void {
    this.cartItemsServic.getCartItemsNumber().subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    })

  }

  showHideFilter(evt: any) {
    this.showFilterAside = evt.target.checked;
    // console.log(evt.target.checked);
    if (this.showFilterAside) {
      this.showCartAside = false;
      const chekcCartInput = <HTMLInputElement>document.getElementById('show-cart');
      chekcCartInput.checked = false;
    }

  }

  showHideCart(evt: any) {
    this.showCartAside = evt.target.checked;
    if (this.showCartAside) {
      this.showFilterAside = false;
      const chekcFilterInput = <HTMLInputElement>document.getElementById('show-filter');
      chekcFilterInput.checked = false;
    }
  }

  showMenuIteme(evt: any) {
    const chekcCartInput = <HTMLInputElement>document.getElementById('show-cart');
    const chekcFilterInput = <HTMLInputElement>document.getElementById('show-filter');

    if (chekcCartInput.checked) {
      chekcCartInput.checked = false;
      this.showCartAside = false;
    }
    if (chekcFilterInput.checked) {
      chekcFilterInput.checked = false;
      this.showFilterAside = false;
    }

    const filterAside = <HTMLDivElement>document.querySelector('.left');
    const showFilterAside = filterAside.classList.contains('showFilterAside');

    if (showFilterAside) {
      filterAside.classList.remove('showFilterAside')
    }
  }



}
