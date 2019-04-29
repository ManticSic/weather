import {IDarkSkyConfig} from "./dark-sky-config.interface";
import {ICacheConfig} from "./cache-config.interface";

export interface IModuleConfig {
  darkSky: IDarkSkyConfig;
  cache: ICacheConfig;
}
