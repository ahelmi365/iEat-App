import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { FormGroup, FormControl, CheckboxControlValueAccessor } from '@angular/forms';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-menu-filtering',
  templateUrl: './menu-filtering.component.html',
  styleUrls: ['./menu-filtering.component.css']
})
export class MenuFilteringComponent implements OnInit {
  filterItems = ['all', 'breakfast', 'lunch', 'soup', 'drinks', 'desserts'];
  itemChecked: boolean = true;

  filterForm = new FormGroup({
    all: new FormControl(''),
    breakfast: new FormControl(''),
    lunch: new FormControl(''),
    soup: new FormControl(''),
    drinks: new FormControl(''),
    desserts: new FormControl(''),
  });

  constructor(protected menuItemsService: MenuItemsService) { }

  ngOnInit(): void {

  }

  applyChecked(evt: any) {


    if (evt.target.id == 'all' && evt.target.checked) {
      for (let item = 0; item < this.filterItems.length; item++) {
        let elm = <HTMLFormElement>document.getElementById(this.filterItems[item]);
        if (elm.id != 'all') {
          elm['checked'] = true;
        }

      }
    } else if (evt.target.id == 'all' && !(evt.target.checked)) {

      for (let item = 0; item < this.filterItems.length; item++) {
        let elm = <HTMLFormElement>document.getElementById(this.filterItems[item]);

        elm['checked'] = false;

      }

    } else {
      const all = <HTMLFormElement>document.getElementById('all');
      all['checked'] = false;

      let allOtherChecked = true;
      for (let item = 1; item < this.filterItems.length; item++) {
        let elm = <HTMLFormElement>document.getElementById(this.filterItems[item]);
        if (elm['checked'] != true) {
          allOtherChecked = false;
          break
        }
      }

      if (allOtherChecked) {
        const all = <HTMLFormElement>document.getElementById('all');
        all['checked'] = true;
      }
    }



  }

  onFilterChange(evt: any) {
    const allFilterItems = document.getElementsByClassName('form-check-input') as HTMLCollectionOf<HTMLInputElement>;
    const chckedFilterItems: string[] = [];

    Array.from(allFilterItems).forEach((element) => {
      if (element.checked) {
        chckedFilterItems.push(element.id);
      }

    });
    console.log(chckedFilterItems);

    this.menuItemsService.checkedFilterItems = chckedFilterItems;
    console.log(this.menuItemsService.checkedFilterItems);
    // this.menuItemsService.filterMenuItems(chckedFilterItems);

    // this.menuItemsService.setTestFilter(chckedFilterItems[0]);
    this.menuItemsService.setTestFilter(chckedFilterItems);
  }


}
