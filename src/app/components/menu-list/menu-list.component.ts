import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { menuItem } from 'src/app/models/menu_items_model';
import { MenuItemsService } from 'src/app/services/menu-items.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuItems: menuItem[] = [];
  menuItemSubscription: Subscription = new Subscription();

  // testFilter='all';
  testFilter = ['all'];

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemSubscription = this.menuItemsService.getMenuItems().subscribe(res => {
      this.menuItems = res;
    });

    this.menuItemsService.getTestFilter().subscribe(newVal => {
    if (newVal.length == 0){
      this.testFilter=['all'];
    }else{
      this.testFilter = newVal
    }
      // newVal? this.testFilter = newVal: this.testFilter=['all'];
      console.log(`newVal is length ${newVal.length}`);

    })
    console.log(this.testFilter);

  }


  getIntersection(listOne: [], listTwo: string[]): boolean {
    const set1 = new Set(listOne);
    const set2 = new Set(listTwo);

    const intersection = [...set1].filter(
      element => set2.has(element)
    );
    // console.log('log intersection from getIntersection', intersection);

    return intersection.length > 0;
  }


  checkIntersection(menu_item: any=['all']): boolean {
    return this.getIntersection(menu_item, this.testFilter)
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,

    })
  }


  ngOnDestroy(): void {
    this.menuItemSubscription.unsubscribe();
  }

}
