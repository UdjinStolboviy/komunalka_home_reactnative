import { injectable } from "inversify";
import { action, observable } from "mobx";
import { NotificationsState } from "./notifications/notifications.state";
import { AnimationsState } from "./animation/animations.state";
import { NavigationState } from "./navigation/navigation.state.model";
import { ListenerState } from "./listener/listener.state.model";
import { CalculatorState, ICalculatorState } from "./calculator/calculator.model";
import { SettingAccountTariffState } from "./setting-account/setting.account.tariff.model";
import { TimeState } from "./time/time.model";
import { HomeState } from "./home/homeState.model";


@injectable()
export class GlobalStorage {

    @observable private notificationsState: NotificationsState;
    @observable private animationsState: AnimationsState;
    @observable private navigationState: NavigationState;
    @observable private calculatorState: CalculatorState;
    @observable private timeState: TimeState;
    @observable private settingAccountTariffState: SettingAccountTariffState;
    @observable private readonly listenerState: ListenerState;
    @observable private homesState: HomeState;




    constructor() {

        this.notificationsState = new NotificationsState({
            notifications: [],
            badgeShown: false
        })
        this.calculatorState = new CalculatorState();
        this.settingAccountTariffState = new SettingAccountTariffState();
        this.animationsState = new AnimationsState();
        this.navigationState = new NavigationState();
        this.listenerState = new ListenerState();
        this.timeState = new TimeState();
        this.homesState = new HomeState();

    }


    public getNotificationsState(): NotificationsState {
        return this.notificationsState;
    }

    public getHomesState(): HomeState {
        return this.homesState;
    }

    public setHomesState(value: HomeState) {
        this.homesState = value;
    }


    public getAnimationsState(): AnimationsState {
        return this.animationsState;
    }

    public getNavigationState(): NavigationState {
        return this.navigationState;
    }

    public getCalculatorState(): CalculatorState {
        return this.calculatorState;
    }

    public getTimeState(): TimeState {
        return this.timeState;
    }

    public getSettingAccountTariffState(): SettingAccountTariffState {
        return this.settingAccountTariffState;
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
