import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyServiceService } from '../currency-service.service';
import { Router } from '@angular/router';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent {
  cList: any[] = [];
  userForm: FormGroup = new FormGroup({});
  status = true;
  currentCode: string = '';
  existingCurrencyCodes: any[] = [];

  constructor(
    private Service: CurrencyServiceService,
    private router: Router,
    private dataservice: SharedDataServiceService
  ) {}
  ngOnInit(): void {
    this.fetchDetails();
    const data = this.dataservice.getData();
    if (data.length != 0) {
      this.cList = data;
      this.status = false;
      this.dataservice.setData([]);
    }
    this.userForm = new FormGroup({
      currencyId: new FormControl(),
      currencyCode: new FormControl('', [this.uniqueCurrencyCodeValidator.bind(this), Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
      currencyName: new FormControl('', Validators.required)
    });

    this.userForm.patchValue(this.cList);
    this.storeCC();
  }

  storeCC() {
    this.currentCode = this.userForm.value['currencyCode'];
    console.log('ccode', this.currentCode);
  }

  fetchDetails() {
    this.Service.getDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.existingCurrencyCodes = response.map((c) => c.currencyCode);
        console.log('exist', this.existingCurrencyCodes);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  register() {
    this.Service.createNewRecord(this.userForm.value).subscribe({
      next: (res) => {
        alert('Data added');
        this.router.navigate(['/currency-details']);
      },
      error: (err) => {
        console.log(err.error);
        alert(err.error);
        console.log("user form values",this.userForm.value);
      },
    });
  }

  update() {
    this.Service.updateRecord(this.userForm.value).subscribe({
      next: (res) => {
        alert('Updated');
        this.router.navigate(['/currency-details']);
        this.status = true;
        this.cList = [];
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      },
    });
  }

  uniqueCurrencyCodeValidator(control: AbstractControl) {
    const value = (control.value + '').toUpperCase();
    if (value == this.currentCode) {
      return null;
    }
    if (this.existingCurrencyCodes.includes(value)) {
      return { uniqueCurrencyCode: true }; 
    }

    return null;
  }
}
