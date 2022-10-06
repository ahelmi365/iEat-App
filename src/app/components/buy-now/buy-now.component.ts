import { OrderInfo } from './../../models/order_info_model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { Subject, takeUntil } from 'rxjs';




@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit, OnDestroy {

  regionsList = ['zamalek', 'mohandessin', 'dokki', 'downtown', 'maadi', 'other'];
  orderInfo: OrderInfo;
  cartItemsNumber = 0;
  notifier = new Subject<void>();

  constructor(protected orderInfoService: OrderInfoService, protected cartItemsService: CartItemsService, private router: Router) {
    this.orderInfo={
      firstName:"",
      lastName:"",
      phoneNumber:"",
      orderRegion:"",
      orderAddressInDetails:"",
      orderOtherNotes:""
    }
  }

  orderInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]*){0,2}$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]{3,}(?: [a-zA-Z]*){0,2}$')]),
    userPhone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern('[01][0-9]{10}')]),
    region: new FormControl('', [Validators.required]),
    userAddress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    notes: new FormControl(),

  })

  ngOnInit(): void {
    this.cartItemsService.getCartItemsNumber().pipe(takeUntil(this.notifier)).subscribe(cartItemnumber => {
      this.cartItemsNumber = cartItemnumber;
    });
  }

  checkOrderInfoFormValidators(event: any) {

    // check first name error
    const firstNameError = document.getElementById("firstNameError");
    if (this.orderInfoForm.controls.firstName.invalid) {
      (firstNameError as HTMLElement).style.display = "block";
    } else {
      (firstNameError as HTMLElement).style.display = "none";
    }

    // check last name error
    const lastNameError = document.getElementById("lastNameError");
    if (this.orderInfoForm.controls.lastName.invalid) {
      (lastNameError as HTMLElement).style.display = "block";
    } else {
      (lastNameError as HTMLElement).style.display = "none";
    }

    // check userPhoneError error
    const userPhoneError = document.getElementById("userPhoneError");
    if (this.orderInfoForm.controls.userPhone.invalid) {
      (userPhoneError as HTMLElement).style.display = "block";
    } else {
      (userPhoneError as HTMLElement).style.display = "none";
    }

    // check regionErrorError error
    const regionError = document.getElementById("regionError");
    if (this.orderInfoForm.controls.region.invalid || this.orderInfoForm.controls.region.value == '-1') {
      (regionError as HTMLElement).style.display = "block";
    } else {
      (regionError as HTMLElement).style.display = "none";
    }


    // check userAddressError error
    const userAddressError = document.getElementById("userAddressError");
    if (this.orderInfoForm.controls.userAddress.invalid) {
      (userAddressError as HTMLElement).style.display = "block";
    } else {
      (userAddressError as HTMLElement).style.display = "none";
    }

    if (this.orderInfoForm.invalid) {
      event.preventDefault();
      // console.log("invalid Form");
    } else {

      this.submitOrderInfoForm(event);
    }


  }

  submitOrderInfoForm(event: any) {
    this.orderInfo.firstName = this.orderInfoForm.get('firstName')?.value ?? "";
    this.orderInfo.lastName = this.orderInfoForm.get('lastName')?.value ?? "";
    this.orderInfo.phoneNumber = this.orderInfoForm.get('userPhone')?.value ?? "";
    this.orderInfo.orderRegion = this.orderInfoForm.get('region')?.value ?? "";
    this.orderInfo.orderAddressInDetails = this.orderInfoForm.get('userAddress')?.value ?? "";
    this.orderInfo.orderOtherNotes = this.orderInfoForm.get('notes')?.value ?? "";

    // this.orderInfoService.submitOrderInfo([firstName, lastName, userPhone, region, userAddress, notes])
    this.orderInfoService.submitOrderInfo(this.orderInfo)

    // event.currentTarget.submit();
    // console.log("Submited");
    this.router.navigateByUrl('/confirm-order');

  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }


}
