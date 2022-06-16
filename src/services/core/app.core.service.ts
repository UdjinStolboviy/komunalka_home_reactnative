import { IAppCoreService } from "./app.core.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../data/ioc/types";
import { INavigationService } from "../navigation/navigation.service.interface";
import { GlobalStorage } from "../../data/storage/global.storage";

import { ILoggerService } from "../logger/main/logger.service.interface";
import { IAsyncStorage } from "../async-storage/async.storage.interface";
import { IListenerService } from "../listener/listener.service";


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
}
