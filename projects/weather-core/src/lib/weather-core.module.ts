import {ModuleWithProviders, NgModule} from '@angular/core';
import {MODULE_CONFIG} from "./tokens/module-config.token";
import {IModuleConfig} from "./models/module-config.interface";

@NgModule({
  declarations: [],
  imports: [],
  exports: []
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
