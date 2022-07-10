import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { IListenerService } from "../listener/listener.service";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { ISettingAccountTariffState } from "app/data/storage/setting-account/setting.account.tariff.model";
import { ICalculatorState } from "app/data/storage/calculator/calculator.model";
import { IAuthService } from "../auth/auth.service.interface";
import { AuthService } from "../auth/auth.service";



export interface IAppCoreService {
    listenerService: IListenerService;
    navigationService: INavigationService;
    storage: GlobalStorage;
    logger: ILoggerService;
    asyncStorage: IAsyncStorage;
    authService: AuthService;
}
