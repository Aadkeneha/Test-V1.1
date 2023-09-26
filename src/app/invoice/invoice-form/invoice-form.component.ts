import { Component } from '@angular/core';
import { InvoiceServiceService } from '../invoice-service.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';
import { CurrencyServiceService } from 'src/app/currency/currency-service.service';
import { VendorServiceService } from 'src/app/vendor/vendor-service.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent {
  iList: any[] = [];
  userForm: FormGroup = new FormGroup({});
  status = true;
  currentCode: string = '';
  existingInvoiceNumber: any[] = [];
  currencyOptions: { value: number; label: string }[] = [];
  vendorOptions: { value: number; label: string }[] = [];

  constructor(
    private Service: InvoiceServiceService,
    private router: Router,
    private dataservice: SharedDataServiceService,
    private currencyService: CurrencyServiceService,
    private vendorService: VendorServiceService
  ) {}
  ngOnInit(): void {
    this.fetchDetails();
    this.fetchCurrencies();
    this.fetchVendors();
    const data = this.dataservice.getData();
    if (data.length != 0) {
      this.iList = data;
      this.status = false;
      console.log('datainvoice', this.iList);
      this.dataservice.setData([]);
    }
    this.userForm = new FormGroup({
      invoiceId: new FormControl(null),
      invoiceNumber: new FormControl('', [this.uniqueValidator.bind(this), Validators.required]),
      currencyId: new FormControl('', Validators.required),
      vendorId: new FormControl('', Validators.required),
      invoiceAmount: new FormControl('', Validators.required),
      invoiceReceivedDate: new FormControl('', Validators.required),
      invoiceDueDate: new FormControl('', Validators.required),
      isActive: new FormControl(true),
    });

    this.userForm.patchValue(this.iList);
    this.convertDates('invoiceReceivedDate');
    this.convertDates('invoiceDueDate');
    this.storeCC();
  }

  storeCC() {
    this.currentCode = this.userForm.value['invoiceNumber'];
    console.log('ccode', this.currentCode);
  }

  fetchCurrencies() {
    this.currencyService.getDetails().subscribe({
      next: (response) => {
        const currencyData = response;
        const currenciesToAdd = currencyData.map((currency) => ({
          value: currency.currencyId,
          label: currency.currencyName,
        }));
        this.currencyOptions.push(...currenciesToAdd);
      },
    });
  }

  fetchVendors() {
    this.vendorService.getDetails().subscribe({
      next: (response) => {
        const vendorData = response;
        const vendorsToAdd = vendorData.map((vendor) => ({
          value: vendor.vendorId,
          label: vendor.vendorLongName,
        }));
        this.vendorOptions.push(...vendorsToAdd);
      },
    });
  }

  fetchDetails() {
    this.Service.InvoicegetDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.existingInvoiceNumber = response.map((v) => v.invoiceNumber);
        console.log('exist', this.existingInvoiceNumber);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  register() {
    this.Service.InvoicecreateNewRecord(this.userForm.value).subscribe({
      next: (res) => {
        alert('Data added');
        this.router.navigate(['/invoice-details']);
      },
      error: (err) => {
        console.log(err.error);
        alert(err.error);
        console.log('user form values', this.userForm.value);
      },
    });
  }

  update() {
    this.Service.InvoiceupdateRecord(this.userForm.value).subscribe({
      next: (res) => {
        alert('Updated');
        this.router.navigate(['/invoice-details']);
        this.status = true;
        this.iList = [];
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      },
    });
  }

  uniqueValidator(control: AbstractControl) {
    const value = (control.value + '').toUpperCase();
    if (value == this.currentCode) {
      return null;
    }
    if (this.existingInvoiceNumber.includes(value)) {
      return { uniqueCode: true };
    }

    return null;
  }

  convertDates(data:string) {
    const invoiceDate = new Date(this.userForm.value[`${data}`]);
    const localizedDateString = invoiceDate.toLocaleDateString().slice(0, 10); 
    const parts = localizedDateString.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2,'0')}-${parts[1].padStart(2, '0')}`;
    console.log(formattedDate);
   
    if(data == 'invoiceReceivedDate'){
      this.userForm.patchValue({ invoiceReceivedDate: formattedDate });
    }else{
      this.userForm.patchValue({ invoiceDueDate: formattedDate });
    }
    
  }
}
