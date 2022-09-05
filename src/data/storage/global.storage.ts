import { injectable } from "inversify";
import { action, observable, runInAction } from "mobx";
import { NotificationsState } from "./notifications/notifications.state";
import { AnimationsState } from "./animation/animations.state";
import { NavigationState } from "./navigation/navigation.state.model";
import { ListenerState } from "./listener/listener.state.model";
import { CalculatorState, ICalculatorState } from "./calculator/calculator.model";
import { SettingAccountTariffState } from "./setting-account/setting.account.tariff.model";
import { TimeState } from "./time/time.model";
import { HomeState, IHomeState } from "./home/homeState.model";
import { AuthUser } from "./auth/auth.user.model";
import { UserAccount } from "./user-account/user.account.model";
import { AuthState } from "./auth/auth.state.model";
import { BlockedEntitiesState } from "./blocked-entities/blocked.entities.state.model";
import { FirebaseStorage } from "./firebase/firebase.storage.model";


@injectable()
export class GlobalStorage {

    @observable private notificationsState: NotificationsState;
    @observable private animationsState: AnimationsState;
    @observable private navigationState: NavigationState;
    @observable private calculatorState: CalculatorState;
    @observable private timeState: TimeState;
    @observable private settingAccountTariffState: SettingAccountTariffState;
    @observable private readonly listenerState: ListenerState;
    @observable public homesState: HomeState;
    @observable private authUser!: AuthUser;
    @observable private userAccount!: UserAccount;
    @observable private readonly authState: AuthState;
    @observable private readonly blockedEntitiesState: BlockedEntitiesState;
    @observable private readonly firebaseStorage: FirebaseStorage;
    @observable public loginUser: boolean;



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
        this.authState = new AuthState();
        this.blockedEntitiesState = new BlockedEntitiesState();
        this.firebaseStorage = new FirebaseStorage({ analytics: { clientId: "" } });
        this.loginUser = false;
    }

    @action
    public setLoginUser() {
        runInAction(() => {
            this.loginUser = true;
        });
    }

    public getLoginUser() {
        return this.loginUser
    }


    public getFirebaseStorage(): FirebaseStorage {
        return this.firebaseStorage;
    }


    public getBlockedEntitiesState(): BlockedEntitiesState {
        return this.blockedEntitiesState;
    }

    @action
    public setAuthUser(authUser: AuthUser) {
        this.authUser = authUser;
    }

    public getAuthUser() {
        return this.authUser
    }

    @action
    public setUserAccount(userAccount: UserAccount) {
        this.userAccount = userAccount;
    }

    public getUserAccount() {
        return this.userAccount
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
        this.blockedEntitiesState.setBlockedEntities(null);
        this.listenerState.disableListeners();
    }

}
