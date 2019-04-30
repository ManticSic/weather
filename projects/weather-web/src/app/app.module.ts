import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WeatherCoreModule} from "weather-core";
import {WeatherWebRoutingModule} from "./routing.module";
import {ForecastViewComponent} from './views/forecast-view/forecast-view.component';
import { LandingViewComponent } from './views/landing-view/landing-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastViewComponent,
    LandingViewComponent
  ],
  imports: [
    WeatherWebRoutingModule,
    BrowserModule,
    WeatherCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
