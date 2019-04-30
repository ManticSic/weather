import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ForecastViewComponent} from "./views/forecast-view/forecast-view.component";
import {LandingViewComponent} from "./views/landing-view/landing-view.component";

const routes: Routes = [
  {
    path: 'landing',
    component: LandingViewComponent,
  },
  {
    path: 'forecast/:lat/:long',
    component: ForecastViewComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/landing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WeatherWebRoutingModule {
}
