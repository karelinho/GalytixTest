import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country } from '../interfaces';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent implements OnInit {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService, private changeDetectorRef: ChangeDetectorRef) {
    this.countriesService.loadCountries();
  }
  
  ngOnInit(): void {
    this.countriesService.countries$.subscribe(
      (data) => {
        this.countries = data;
        this.changeDetectorRef.markForCheck();
      }
    );
  }

}
