import { ChangeDetectorRef, Component } from '@angular/core';
import { VendorServiceService } from '../vendor-service.service';
import { Router } from '@angular/router';
import { SharedDataServiceService } from 'src/app/shared-data-service.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css'],
})
export class VendorDetailsComponent {
  vList: any[] = [];

  constructor(
    private VendorService: VendorServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private service: SharedDataServiceService
  ) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.VendorService.getDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.vList = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateIsActive(id:number){
    this.VendorService.updateIsActive(id).subscribe({
      next: (response) => {
        alert('Updated');
        this.fetchDetails();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  editRecord(vList: any[]) {
    this.service.setData(vList);
    this.router.navigate(['/vendor-form']);
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.VendorService.delete(id).subscribe({
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
