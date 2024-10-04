import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID=794ee95e63c5a32aaf88cd813fa2e425';

  constructor(private httpClient: HttpClient) { }

  getWeather(country: string): Observable<WeatherData> {
    const options = CountQueuingStrategy ? { params: new HttpParams().set('q', country) } : {};
    return this.httpClient.get(this.weatherUrl, options).pipe(
      map((data: any) => {
          return {
            temperature: data.main.temp,
            precipitation: data.weather[0].main,
            wind: {
              speed: data.wind.speed,
              gust: data.wind.gust
            }
          };
      })
    );
  }
}
