import {Component} from '@angular/core';
import {AppConfigService, IAppConfig, ILocation} from 'weather-core';
import {Router} from "@angular/router";

@Component({
  selector: 'weather-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private appConfig: AppConfigService,
    private router: Router,
  ) {
    const config: IAppConfig = {
      locations: [
        {
          country: 'Germany',
          city: 'Northeim',
          zipCode: '371',
          lat: 0,
          long: 0,
        },
        {
          country: 'Germany',
          city: 'Goettingen',
          zipCode: '371',
          lat: 1,
          long: 1,
        }
      ]
    };

    this.appConfig.save(config);
  }

  public openLocation(location: ILocation): void {
    this.router.navigate(['/', 'forecast', location.lat, location.long]);
  }
}
