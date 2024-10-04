import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'weather/:country', component: WeatherComponent },
  { path: '', redirectTo: '/countries', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
