import { action, observable, runInAction } from "mobx";
import { Home, IHome } from "./home.model";

export interface IHomeState {
    homes: IHome[];
    refreshHome?: boolean;
    connectNetwork?: boolean | null;

}


export class HomeState {

    @observable private homes!: IHome[];
    @observable private refresh: boolean;
    @observable private connectNetwork: boolean | null;




    constructor() {
        this.homes = [];
        this.refresh = true;
        this.connectNetwork = false;

    }

    public getRefresh(): boolean {
        return this.refresh;
    }

    public setRefresh(refresh: boolean): void {
        this.refresh = refresh;
    }

    public getConnectNetwork(): boolean | null {
        return this.connectNetwork;
    }

    @action
    public setConnectNetwork(connectNetwork: boolean | null): void {
        this.connectNetwork = connectNetwork;
    }


    public getHomes(): IHome[] {
        return this.homes;
    }

    @action
    public setHomes(homes: IHome[]): void {
        runInAction(() => {
            this.homes = homes;
        });

    }

    public addHome(home: IHome): void {
        this.homes.push(home);
    }

    public removeHome(home: IHome): void {
        this.homes = this.homes.filter(h => h.id !== home.id);
    }

    public initHomes(homes: IHome[]): void {
        if (!homes || homes.length === 0) {
            this.homes = [];
        }
        else {
            this.homes = homes.map(item => new Home(item));
        }
    }

    @action
    public refreshHome(): boolean {
        return this.refresh = !this.refresh;
    }

}
