import {Component} from '@angular/core';
import {AppConfigService, IAppConfig, ILocation} from 'weather-core';
import {Router} from "@angular/router";
import {ISavedLocation} from "../../../weather-core/src/lib/models/saved-location.interface";

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
          osmId: 1397834
        },
        {
          country: 'Germany',
          city: 'Goettingen',
          state: 'Niedersachsen',
          osmId: 191361
        }
      ]
    };

    this.appConfig.save(config);
  }

  public openLocation(location: ISavedLocation): void {
    this.router.navigate(['/', 'forecast', location.osmId]);
  }
}
