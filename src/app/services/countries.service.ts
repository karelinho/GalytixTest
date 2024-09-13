import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesUrl = 'https://countriesnow.space/api/v0.1/countries';

  countries$: Subject<Country[]> = new Subject<Country[]>();

  constructor(private httpClient: HttpClient) { }

  loadCountries() {
    this.httpClient.get<any>(this.countriesUrl).subscribe(
      (countries) => {
        const countriesArray: Country[] = [];
        for (let i = 0; i < countries.data.length; i++) {
          countriesArray.push({
            name: countries.data[i].country,
            code: countries.data[i].iso3
          })
        }
        this.countries$.next(countriesArray);
      }
    );
  }
}
