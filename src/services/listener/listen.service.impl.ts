import { IListenerService } from "./listener.service";
import { inject, injectable } from "inversify";
import { IObjectDidChange, observe } from "mobx";
import { TYPES } from "../../data/ioc/types";
import { GlobalStorage } from "../../data/storage/global.storage";
import { INavigationService } from "../navigation/navigation.service.interface";
import { NavigationState } from "@react-navigation/native";

import { RouteState } from "app/data/storage/navigation/route.state.model";

@injectable()
export class ListenerService implements IListenerService {

  @inject(TYPES.Storage)
  private storage!: GlobalStorage;
  @inject(TYPES.NavigationService)
  private navigationService!: INavigationService;



  public setupListeners(): void {
    const listenerState = this.storage.getListenerState();
    if (!listenerState.isListenersOn()) {
      const authListener = listenerState.getAuthStateListener();
      const planListener = listenerState.getPlanStateListener();
      if (!authListener) this.listenToAuthStateChange();
      if (!planListener) this.listenToPlanStateChange();
      this.storage.getListenerState().enableListeners();
    }
  }

  public listenToPlanStateChange(): void {

  }

  public listenToAuthStateChange(): void {

  }

  public onNavigationStateChange(state: NavigationState | undefined): void {
    if (!state) {
      return;
    }
    const index = state.index;
    const route = state.routes[index];
    this.saveNavigationState(route);
  }

  private saveNavigationState(route: any) {
    if (!route.state) {
      const { name, params } = route;
      const prev = this.storage.getNavigationState().getCurrentRoute();
      const current = (new RouteState(name, params));
      if (prev.getName() === current.getName()) {
        return;
      }
      this.storage.getNavigationState().setPreviousRoute(this.storage.getNavigationState().getCurrentRoute());
      this.storage.getNavigationState().setCurrentRoute(new RouteState(name, params));
    } else {
      const index = route.state.index;
      const nestedRoute = route.state.routes[index];
      this.saveNavigationState(nestedRoute);
      this._handleOnNavigationStateChange();
    }
  }

  private _handleOnNavigationStateChange() {
    const currentRoute = this.storage.getNavigationState().getCurrentRoute();
    const prevRoute = this.storage.getNavigationState().getPreviousRoute();
  }

  private onPlanStateChange(changedObject: any): void {

  }

  private async onAuthStateChange(changedObject: any): Promise<void> {
    changedObject.object.getLoggedIn();

  }

}
