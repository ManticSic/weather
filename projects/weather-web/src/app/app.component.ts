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
          country: 'Deutschland',
          city: 'Northeim',
          state: 'Niedersachsen',
          lat: 51.705401,
          lon: 9.9972782,
        },
        {
          country: 'Germany',
          city: 'Goettingen',
          state: 'Niedersachsen',
          lat: 51.5327604,
          lon: 9.9352051,
        }
      ]
    };

    this.appConfig.save(config);
  }

  public openLocation(location: ILocation): void {
    this.router.navigate(['/', 'forecast', location.lat, location.lon]);
  }
}
