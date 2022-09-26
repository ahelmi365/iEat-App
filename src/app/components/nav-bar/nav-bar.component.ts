import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  navBarItems: {navTitle:string, url:string}[] = [
    { "navTitle": 'Home', "url": 'menu-list' },  { "navTitle": 'Cart', "url": '/buy-now' }, { "navTitle": 'About Us', "url": '/aboutUs' },]
  constructor() { }

  ngOnInit(): void {
  }

}
