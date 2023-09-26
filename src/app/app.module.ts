import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorDetailsComponent } from './vendor/vendor-details/vendor-details.component';
import { VendorFormComponent } from './vendor/vendor-form/vendor-form.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { CurrencyDetailsComponent } from './currency/currency-details/currency-details.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { HomeComponent } from './home/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorDetailsComponent,
    VendorFormComponent,
    InvoiceDetailsComponent,
    InvoiceFormComponent,
    CurrencyDetailsComponent,
    CurrencyFormComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
