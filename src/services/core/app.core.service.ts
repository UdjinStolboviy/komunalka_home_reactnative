import { IAppCoreService } from "./app.core.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../data/ioc/types";
import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";

import { ILoggerService } from "../logger/main/logger.service.interface";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { IListenerService } from "../listener/listener.service";
import { ISettingAccountTariffState } from "app/data/storage/setting-account/setting.account.tariff.model";
import { AuthService } from "../auth/auth.service";
import { IUtilsService } from "../utils/utils.service.interface";
import { IRESTService } from "../http/rest.service.interface";
import { IDBService } from "../data-base/db.service.interface";
import { IAuthService } from "../auth/auth.service.interface";
import { IPushNotificationService } from "../push-notification/push.notification.service.interface";
import { INotificationsService } from "../notification/notifications.service.interface";
import { IDeepLinkService } from "../deep-link/deep.link.service.interface";
import { ISessionService } from "../session/session.service.interface";


@injectable()
export class AppCoreService implements IAppCoreService {

    @inject(TYPES.NavigationService)
    public navigationService!: INavigationService;
    @inject(TYPES.Storage)
    public storage!: GlobalStorage;
    @inject(TYPES.Logger)
    public logger!: ILoggerService;
    @inject(TYPES.AsyncStorage)
    public asyncStorage!: IAsyncStorage;
    @inject(TYPES.ListenerService)
    public listenerService!: IListenerService;
    @inject(TYPES.AuthService)
    public authService!: AuthService;
    @inject(TYPES.UtilsService)
    public utilsService!: IUtilsService;
    @inject(TYPES.RESTService) public restService!: IRESTService;
    @inject(TYPES.DBService) public dbService!: IDBService;
    @inject(TYPES.PushNotificationService) public pushNotificationService!: IPushNotificationService;
    @inject(TYPES.DeepLinkService) public deepLinkService!: IDeepLinkService;
    @inject(TYPES.NotificationsService) public notificationsService!: INotificationsService;
    @inject(TYPES.SessionService) public sessionService!: ISessionService;

}
