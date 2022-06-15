import "reflect-metadata";
import React, { useContext } from "react";
import { Container } from "inversify";
import { IAppCoreService } from "../services/core/app.core.service.interface";
import { TYPES } from "./types";
import { AppCoreService } from "../services/core/app.core.service";
import { Provider as InversifyProvider } from 'inversify-react';
import { INavigationService } from "../services/navigation/navigation.service.interface";
import { NavigationService } from "../services/navigation/navigation.service";
import { GlobalStorage } from "../storage/global.storage";
import { ILoggerService } from "../services/logger/logger.service.interface";
import { LoggerService } from "../services/logger/logger.service";




const appContainer: Container = new Container();
appContainer.bind<IAppCoreService>(TYPES.AppCoreService).to(AppCoreService).inSingletonScope();
appContainer.bind<INavigationService>(TYPES.NavigationService).to(NavigationService).inSingletonScope();
appContainer.bind<ILoggerService>(TYPES.Logger).to(LoggerService).inSingletonScope();
appContainer.bind(TYPES.Storage).to(GlobalStorage).inSingletonScope();

const appCoreService = appContainer.get<IAppCoreService>(TYPES.AppCoreService);
const InversifyContext = React.createContext<{ container: Container }>({container: appContainer});

export const Provider: React.FC<{ container: Container }> = props => {
  return (
    <InversifyContext.Provider value={{container: props.container}}>
      <InversifyProvider container={props.container}>{props.children}</InversifyProvider>
    </InversifyContext.Provider>
  );
};

export function useAppInjection(): IAppCoreService {
  const {container} = useContext(InversifyContext);
  const app = container.get<IAppCoreService>(TYPES.AppCoreService);
  return app;
}

export { appContainer }
export { appCoreService }
