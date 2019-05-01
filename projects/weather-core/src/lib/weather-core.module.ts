import {ModuleWithProviders, NgModule} from '@angular/core';
import {MODULE_CONFIG} from "./tokens/module-config.token";
import {IModuleConfig} from "./models/module-config.interface";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CachingService} from "./caching.service";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingService,
      multi: true,
    }
  ]
})
export class WeatherCoreModule {

  public static forRoot(config: IModuleConfig): ModuleWithProviders {
    return {
      ngModule: WeatherCoreModule,
      providers: [
        {
          provide: MODULE_CONFIG,
          useValue: config
        }
      ]
    }
  }

}
