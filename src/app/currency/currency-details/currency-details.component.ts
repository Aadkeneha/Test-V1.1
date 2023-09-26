import { ChangeDetectorRef, Component } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { Router } from '@angular/router';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent {
  cList: any[] = [];

  constructor(
    private Service: CurrencyServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private service: SharedDataServiceService
  ) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.Service.getDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.cList = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editRecord(cList: any[]) {
    this.service.setData(cList);
    this.router.navigate(['/currency-form']);
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.Service.delete(id).subscribe({
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
