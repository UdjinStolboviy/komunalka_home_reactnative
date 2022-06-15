import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../storage/global.storage";
import { ILoggerService } from "../logger/logger.service.interface";
import { IPushNotificationService } from "../push-notification/push.notification.service.interface";
import { IUtilsService } from "../utils/utils.service.interface";
import { INotificationsService } from "../notification/notifications.service.interface";
import { IContactsService } from "../contacts/contacts.service.interface";
import { IDeepLinkService } from "../deep-link/deep.link.service.interface";
import { ISessionService } from "../session/session.service.interface";
import { IAnalyticsService } from "../analytics/analytics.service.interface";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { IListenerService } from "../listener/listener.service";
import { IChatService } from "../chat/chat.service";
import { INetworkService } from "../network/network.service.interface";


export interface IAppCoreService {
    navigationService: INavigationService;
    storage: GlobalStorage;
    logger: ILoggerService;
}
