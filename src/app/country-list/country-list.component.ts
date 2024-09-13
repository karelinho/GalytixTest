import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country, WeatherData } from '../interfaces';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent implements OnInit {

  public countries: Country[] = [];

  constructor(
    private countriesService: CountriesService,
    private weatherService: WeatherService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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

  public showWeather(country: Country) {
    this.weatherService.getWeather(country.name).subscribe((data: WeatherData) => {
      country.weather = data;
      this.changeDetectorRef.markForCheck();
      console.log('DATA: ' + JSON.stringify(data));
    });
  }
}
