import { InjectionToken } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { AppConfig } from "./appConfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
  apiEndpoint: enviroment.apiEndpoint
};
