import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDetailsComponent } from './vendor/vendor-details/vendor-details.component';
import { VendorFormComponent } from './vendor/vendor-form/vendor-form.component';
import { CurrencyDetailsComponent } from './currency/currency-details/currency-details.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { HomeComponent } from './home/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'vendor-details', component: VendorDetailsComponent },
  { path: 'vendor-form', component: VendorFormComponent },
  { path: 'currency-details', component: CurrencyDetailsComponent },
  { path: 'currency-form', component: CurrencyFormComponent },
  { path: 'invoice-details', component: InvoiceDetailsComponent },
  { path: 'invoice-form', component:InvoiceFormComponent },
  { path: 'page-not-found', component:PageNotFoundComponent },
  { path: '**', redirectTo:'/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
