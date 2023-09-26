import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorServiceService } from '../vendor-service.service';
import { Router } from '@angular/router';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css'],
})
export class VendorFormComponent {
  vList: any[] = [];
  userForm: FormGroup = new FormGroup({});
  status = true;
  currentCode: string = '';
  existingVendorCodes: any[] = [];

  constructor(
    private Service: VendorServiceService,
    private router: Router,
    private dataservice: SharedDataServiceService,
    
  ) {}
  ngOnInit(): void {
    this.fetchDetails();
    const data = this.dataservice.getData();
    if (data.length != 0) {
      this.vList = data;
      this.status = false;
      this.dataservice.setData([]);
    }
    this.userForm = new FormGroup({
      vendorId: new FormControl(),
      vendorCode: new FormControl('', [this.uniqueVendorCodeValidator.bind(this),Validators.required]),
      vendorLongName: new FormControl('', Validators.required),
      vendorPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.numericValidator.bind(this)]),
      vendorEmail: new FormControl('', [Validators.required, Validators.email]),
      vendorCreatedOn: new FormControl(new Date()),
      isActive: new FormControl(true),
    });

    this.userForm.patchValue(this.vList);
    this.storeCC();
  }

  storeCC() {
    this.currentCode = this.userForm.value['vendorCode'];
    console.log('ccode', this.currentCode);
  }

  fetchDetails() {
    this.Service.getDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.existingVendorCodes = response.map((v) => v.vendorCode);
        console.log('exist', this.existingVendorCodes);
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
        this.router.navigate(['/vendor-details']);
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
        this.router.navigate(['/vendor-details']);
        this.status = true;
        this.vList = [];
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      },
    });
  }

  uniqueVendorCodeValidator(control: AbstractControl) {
    const value = (control.value + '').toUpperCase();
    if (value == this.currentCode) {
      return null;
    }
    if (this.existingVendorCodes.includes(value)) {
      return { uniqueVendorCode: true }; 
    }

    return null;
  }

  numericValidator(control: AbstractControl){
      const value = control.value;
  
      if (value === null || value === undefined || value === '') {
        return null; 
      }
      const numericPattern = /^[0-9]*$/;
  
      if (!numericPattern.test(value)) {
        return { numericOnly: true };
      }
  
      return null; 
    };
}
