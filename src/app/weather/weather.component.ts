import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent {

  public selectedCountryWeather?: WeatherData;

  public countryName = '';

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.countryName = params['country'];
      this.weatherService.getWeather(this.countryName).subscribe((data: WeatherData) => {
        this.selectedCountryWeather = data;
        this.changeDetectorRef.markForCheck();
      });
    });
  }
}
