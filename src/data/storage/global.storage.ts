import { injectable } from "inversify";
import { action, observable } from "mobx";
import { NotificationsState } from "./notifications/notifications.state";
import { AnimationsState } from "./animation/animations.state";
import { NavigationState } from "./navigation/navigation.state.model";
import { ListenerState } from "./listener/listener.state.model";


@injectable()
export class GlobalStorage {

    @observable private notificationsState: NotificationsState;
    @observable private animationsState: AnimationsState;
    @observable private navigationState: NavigationState;
    @observable private readonly listenerState: ListenerState;



    constructor() {

        this.notificationsState = new NotificationsState({
            notifications: [],
            badgeShown: false
        })
        this.animationsState = new AnimationsState();
        this.navigationState = new NavigationState();
        this.listenerState = new ListenerState();
    }


    public getNotificationsState(): NotificationsState {
        return this.notificationsState;
    }


    public getAnimationsState(): AnimationsState {
        return this.animationsState;
    }

    public getNavigationState(): NavigationState {
        return this.navigationState;
    }

    @action
    public setNavigationState(value: NavigationState) {
        this.navigationState = value;
    }


    public getListenerState(): ListenerState {
        return this.listenerState;
    }


    @action
    public clearStorage() {

        this.animationsState = new AnimationsState();

        this.notificationsState = new NotificationsState({
            notifications: [],
            badgeShown: false
        })

        this.listenerState.disableListeners();
    }




}
