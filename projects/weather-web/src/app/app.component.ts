import {Component} from '@angular/core';
import {AppConfigService, IAppConfig} from 'weather-core';

@Component({
  selector: 'weather-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private appConfig: AppConfigService
  ) {
    const config: IAppConfig = {
      locations: [
        {
          country: 'Germany',
          city: 'Northeim',
          zipCode: '371',
          lat: 0,
          long: 0,
        }
      ]
    };

    this.appConfig.save(config);
  }
}
