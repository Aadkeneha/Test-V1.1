import { ChangeDetectorRef, Component } from '@angular/core';
import { InvoiceServiceService } from '../invoice-service.service';
import { Router } from '@angular/router';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  iList: any[] = [];

  constructor(
    private Service: InvoiceServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private service: SharedDataServiceService
  ) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.Service.InvoicegetDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.iList = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateIsActive(id:number){
    this.Service.updateIsActive(id).subscribe({
      next: (response) => {
        alert('Updated');
        this.fetchDetails();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  editRecord(iList: any[]) {
    this.service.setData(iList);
    this.router.navigate(['/invoice-form']);
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.Service.Invoicedelete(id).subscribe({
        next: (response) => {
          alert('deleted');
          this.fetchDetails();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
