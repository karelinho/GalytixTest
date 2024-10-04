import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country } from '../interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private countries: Country[] = [];

  private filteredCountries: Country[] = [];

  public selectedCountries: Country[] = [];

  public filterValue: string = '';

  public isPaginatorHidden = false;

  length = 500;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private countriesService: CountriesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.countriesService.loadCountries();
  }
  
  ngOnInit(): void {
    this.countriesService.countries$.subscribe(
      (data) => {
        this.countries = data;
        this.length = data.length;
        this.selectedCountries = this.countries.slice(0, this.pageSize);
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  public showWeather(country: Country) {
    this.router.navigate(['weather'], { queryParams: { country: country.name }});
  }

  public handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    if (this.filterValue != '') {
      this.selectedCountries = this.filteredCountries.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    } else {
      this.selectedCountries = this.countries.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    }
  }

  public onFilterChanged() {
    if (this.filterValue.trim() != '') {
      this.filteredCountries = this.countries.filter((country: Country) => {
        return country.name.toLowerCase().startsWith(this.filterValue);
      });
      this.length = this.filteredCountries.length;
      this.pageIndex = 0;
      this.selectedCountries = this.filteredCountries.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    } else {
      this.pageIndex = 0;
      this.filteredCountries = [];
      this.length = this.countries.length;
      this.selectedCountries = this.countries.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    }
    this.isPaginatorHidden = this.filterValue.trim() != '';
    this.changeDetectorRef.markForCheck();
  }
}
