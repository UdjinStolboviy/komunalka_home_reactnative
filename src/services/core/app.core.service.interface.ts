import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { IListenerService } from "../listener/listener.service";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { ISettingAccountTariffState } from "app/data/storage/setting-account/setting.account.tariff.model";
import { ICalculatorState } from "app/data/storage/calculator/calculator.model";
import { IAuthService } from "../auth/auth.service.interface";
import { AuthService } from "../auth/auth.service";
import { IUtilsService } from "../utils/utils.service.interface";
import { IRESTService } from "../http/rest.service.interface";
import { IPushNotificationService } from "../push-notification/push.notification.service.interface";
import { INotificationsService } from "../notification/notifications.service.interface";
import { IDeepLinkService } from "../deep-link/deep.link.service.interface";
import { ISessionService } from "../session/session.service.interface";
import { IDBService } from "../data-base/db.service.interface";



export interface IAppCoreService {
    pushNotificationService: IPushNotificationService;
    deepLinkService: IDeepLinkService;
    sessionService: ISessionService;
    notificationsService: INotificationsService;
    listenerService: IListenerService;
    restService: IRESTService
    navigationService: INavigationService;
    storage: GlobalStorage;
    logger: ILoggerService;
    asyncStorage: IAsyncStorage;
    authService: AuthService;
    utilsService: IUtilsService;
    dbService: IDBService;

}
