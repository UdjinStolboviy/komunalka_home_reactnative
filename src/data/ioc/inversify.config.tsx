import 'reflect-metadata';
import React, {ReactNode, useContext} from 'react';
import {Container} from 'inversify';

import {TYPES} from './types';

import {Provider as InversifyProvider} from 'inversify-react';
import {GlobalStorage} from '../storage/global.storage';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppCoreService} from 'app/services/core/app.core.service';
import {INavigationService} from 'app/services/navigation/navigation.service.interface';
import {NavigationService} from 'app/services/navigation/navigation.service';
import {ILoggerService} from 'app/services/logger/main/logger.service.interface';
import {LoggerService} from 'app/services/logger/main/logger.service';
import {IListenerService} from 'app/services/listener/listener.service';
import {ListenerService} from 'app/services/listener/listen.service.impl';
import {IAsyncStorage} from 'app/services/async-storage/async.storage.interface';
import {AsyncStorage} from 'app/services/async-storage/async.storage';
import {AuthService} from 'app/services/auth/auth.service';
import {IUtilsService} from 'app/services/utils/utils.service.interface';
import {UtilsService} from 'app/services/utils/utils.service';
import {IRESTService} from 'app/services/http/rest.service.interface';
import {RESTService} from 'app/services/http/rest.service';
import {IPushNotificationService} from 'app/services/push-notification/push.notification.service.interface';
import {PushNotificationsService} from 'app/services/push-notification/push.notifications.service';
import {INotificationsService} from 'app/services/notification/notifications.service.interface';
import {NotificationService} from 'app/services/notification/notification.service';
import {IDeepLinkService} from 'app/services/deep-link/deep.link.service.interface';
import {DeepLinkService} from 'app/services/deep-link/deep.link.service';
import {ISessionService} from 'app/services/session/session.service.interface';
import {SessionService} from 'app/services/session/session.service';
import {IAuthService} from 'app/services/auth/auth.service.interface';
import {IDBService} from 'app/services/data-base/db.service.interface';
import {DBService} from 'app/services/data-base/db.service';
import {IUserAccountService} from 'app/services/user-account/user.account.service.interface';
import {UserAccountService} from 'app/services/user-account/user.account.service';
import {
  INotificationsState,
  NotificationsState,
} from '../storage/notifications/notifications.state';

const appContainer: Container = new Container();
appContainer
  .bind<IAppCoreService>(TYPES.AppCoreService)
  .to(AppCoreService)
  .inSingletonScope();
appContainer
  .bind<INavigationService>(TYPES.NavigationService)
  .to(NavigationService)
  .inSingletonScope();
appContainer
  .bind<ILoggerService>(TYPES.Logger)
  .to(LoggerService)
  .inSingletonScope();
appContainer
  .bind<IRESTService>(TYPES.RESTService)
  .to(RESTService)
  .inSingletonScope();
appContainer
  .bind<IListenerService>(TYPES.ListenerService)
  .to(ListenerService)
  .inSingletonScope();
appContainer
  .bind<IAsyncStorage>(TYPES.AsyncStorage)
  .to(AsyncStorage)
  .inSingletonScope();
appContainer
  .bind<IPushNotificationService>(TYPES.PushNotificationService)
  .to(PushNotificationsService)
  .inSingletonScope();
appContainer
  .bind<IUtilsService>(TYPES.UtilsService)
  .to(UtilsService)
  .inSingletonScope();
appContainer
  .bind<INotificationsService>(TYPES.NotificationsService)
  .to(NotificationService)
  .inSingletonScope();
appContainer
  .bind<IDeepLinkService>(TYPES.DeepLinkService)
  .to(DeepLinkService)
  .inSingletonScope();
appContainer
  .bind<ISessionService>(TYPES.SessionService)
  .to(SessionService)
  .inSingletonScope();
appContainer
  .bind<IUserAccountService>(TYPES.UserAccountService)
  .to(UserAccountService)
  .inSingletonScope();

appContainer.bind<IDBService>(TYPES.DBService).to(DBService).inSingletonScope();
appContainer.bind(TYPES.Storage).to(GlobalStorage).inSingletonScope();
appContainer.bind(TYPES.AuthService).to(AuthService).inSingletonScope();

const appCoreService = appContainer.get<IAppCoreService>(TYPES.AppCoreService);
const InversifyContext = React.createContext<{container: Container}>({
  container: appContainer,
});

export const Provider: React.FC<{
  children: ReactNode;
  container: Container;
}> = props => {
  return (
    <InversifyContext.Provider value={{container: props.container}}>
      <InversifyProvider container={props.container}>
        {props.children}
      </InversifyProvider>
    </InversifyContext.Provider>
  );
};

export function useAppInjection(): IAppCoreService {
  const {container} = useContext(InversifyContext);
  const app = container.get<IAppCoreService>(TYPES.AppCoreService);
  return app;
}

export {appContainer};
export {appCoreService};
