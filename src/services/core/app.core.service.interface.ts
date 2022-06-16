import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { IListenerService } from "../listener/listener.service";
import { IAsyncStorage } from "../async-storage/async.storage.interface";



export interface IAppCoreService {
    navigationService: INavigationService;
    storage: GlobalStorage;
    logger: ILoggerService;
    listenerService: IListenerService;
    asyncStorage: IAsyncStorage;
}
