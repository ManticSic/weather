import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WeatherCoreModule} from "weather-core";
import {WeatherWebRoutingModule} from "./routing.module";
import {ForecastViewComponent} from './views/forecast-view/forecast-view.component';
import {LandingViewComponent} from './views/landing-view/landing-view.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ForecastViewComponent,
    LandingViewComponent
  ],
  imports: [
    HttpClientModule,
    WeatherWebRoutingModule,
    BrowserModule,
    WeatherCoreModule.forRoot({
      darkSky: {
        secret: '',
      },
      cache: {
        maxAge: 1000 * 60 * 60 * 4,
        cleanupInterval: 1000 * 60
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
