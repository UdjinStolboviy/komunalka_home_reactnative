import { AsyncStorageFacade, AsyncStorageKey } from "app/data/async-storege";
import { action, makeObservable, observable, runInAction } from "mobx";
import SplashScreen from "react-native-splash-screen";

export interface IAuthState {
    authStareRender: boolean;

}

export class AuthState {

    @observable private authStareRender: boolean;




    constructor() {
        this.authStareRender = false;

    }

    @action
    public setAuthStareRender(value: boolean) {

        this.authStareRender = value;

    }

    public getAuthStareRender() {
        return this.authStareRender;
    }


    @action
    public clearState() {
        this.authStareRender = false;

    }
}
