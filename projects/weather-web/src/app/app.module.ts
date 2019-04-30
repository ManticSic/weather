import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WeatherCoreModule} from "weather-core";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WeatherCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
