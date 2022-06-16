import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { IListenerService } from "../listener/listener.service";



export interface IAppCoreService {
    navigationService: INavigationService;
    storage: GlobalStorage;
    logger: ILoggerService;
    listenerService: IListenerService;
}
