import { APP_INITIALIZER } from "@angular/core";
import { ConfigService } from "../services/config.service";

function initializerFn(configService: ConfigService) {
	return () => {
		return configService.loadConfigData();
	};
}

export const ConfigAppInitializer = {
    provide: APP_INITIALIZER,
    multi: true,
	deps: [ConfigService],
	useFactory: initializerFn,
};