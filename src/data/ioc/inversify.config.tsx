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
import { AuthService } from 'app/services/auth/auth.service';

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
  .bind<IListenerService>(TYPES.ListenerService)
  .to(ListenerService)
  .inSingletonScope();
appContainer
  .bind<IAsyncStorage>(TYPES.AsyncStorage)
  .to(AsyncStorage)
  .inSingletonScope();
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
