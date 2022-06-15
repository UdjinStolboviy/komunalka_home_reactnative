import { Screens } from "app/res-const/codes/Screens";
import { action, observable } from "mobx";
import { RouteState } from "./route.state.model";



export class NavigationState {

  @observable private currentRoute: RouteState;
  @observable private previousRoute: RouteState;
  @observable private initialRoute: string | null;

  constructor(initialRoute?: string) {
    this.previousRoute = new RouteState("", undefined);
    this.currentRoute = new RouteState(Screens.SCREEN_LOGIN, undefined);
    this.initialRoute = null;
  }

  public getCurrentRoute(): RouteState {
    return this.currentRoute;
  }

  @action
  public setCurrentRoute(currentRoute: RouteState): void {
    this.currentRoute = currentRoute;
  }

  public getPreviousRoute(): RouteState {
    return this.previousRoute;
  }

  @action
  public setPreviousRoute(previousRoute: RouteState): void {
    this.previousRoute = previousRoute;
  }

  public getInitialRoute(): string | null {
    return this.initialRoute;
  }

  @action
  public setInitialRoute(initialRoute: string): void {
    this.initialRoute = initialRoute;
  }

}
