import {InjectionToken} from "@angular/core";
import {IModuleConfig} from "../models/module-config.interface";

export const MODULE_CONFIG: InjectionToken<IModuleConfig> = new InjectionToken<IModuleConfig>('weather.module.config');
