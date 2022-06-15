import { IAppCoreService } from "./app.core.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../data/ioc/types";
import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";
import { ILoggerService } from "../logger/logger.service.interface";
import { IRESTService } from "../http/rest.service.interface";
import { IPushNotificationService } from "../push-notification/push.notification.service.interface";
import { IUtilsService } from "../utils/utils.service.interface";
import { INotificationsService } from "../notification/notifications.service.interface";
import { IContactsService } from "../contacts/contacts.service.interface";
import { IDeepLinkService } from "../deep-link/deep.link.service.interface";
import { ISessionService } from "../session/session.service.interface";
import { IAnalyticsService } from "../analytics/analytics.service.interface";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { IListenerService } from "../listener/listener.service";
import { INetworkService } from "../network/network.service.interface";


@injectable()
export class AppCoreService implements IAppCoreService {
    @inject(TYPES.NavigationService) public navigationService: INavigationService;
    @inject(TYPES.Storage) public storage: GlobalStorage;
    @inject(TYPES.Logger) public logger: ILoggerService;
    @inject(TYPES.RESTService) public restService: IRESTService;
    @inject(TYPES.PushNotificationService) public pushNotificationService: IPushNotificationService;
    @inject(TYPES.UtilsService) public utilsService: IUtilsService;
    @inject(TYPES.NotificationsService) public notificationsService: INotificationsService;
    @inject(TYPES.ContactsService) public contactsService: IContactsService;
    @inject(TYPES.DeepLinkService) public deepLinkService: IDeepLinkService;
    @inject(TYPES.SessionService) public sessionService: ISessionService;
    @inject(TYPES.AnalyticsService) public analyticsService: IAnalyticsService;
    @inject(TYPES.AsyncStorage) public asyncStorage: IAsyncStorage;
    @inject(TYPES.ListenerService) public listenerService: IListenerService;
    @inject(TYPES.NetworkService) public networkService: INetworkService;
}
