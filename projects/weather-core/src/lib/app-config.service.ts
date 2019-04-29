import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IAppConfig} from "./models/app-config.interface";
import {DEFAULT_APP_CONFIG} from "./const/default-app-config";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private static APP_CONFIG_LS_KEY: string = "weather.core.app-config";

  private appConfig$: BehaviorSubject<IAppConfig> = new BehaviorSubject(this.loadFromLocalStorage());

  constructor() {
  }

  public load(reload: boolean = false): Observable<IAppConfig> {

    if (reload) {
      this.appConfig$.next(this.loadFromLocalStorage());
    }

    return this.appConfig$.asObservable();
  }

  public save(config: IAppConfig): void {
    this.appConfig$.next(config);
  }

  private loadFromLocalStorage(): IAppConfig {
    const lsData: string | null = localStorage.getItem(AppConfigService.APP_CONFIG_LS_KEY);

    if (lsData === null) {
      console.warn('Found no app config in local storage');
      return {...DEFAULT_APP_CONFIG};
    }

    try {
      return JSON.parse(lsData);
    } catch (e) {
      console.warn('Failed to parse app config from local storage', e);
      return {...DEFAULT_APP_CONFIG};
    }
  }
}
