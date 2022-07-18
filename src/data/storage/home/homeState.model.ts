import { action, observable } from "mobx";
import { Home, IHome } from "./home.model";

export interface IHomeState {
    homes: Home[];
    refreshHome?: boolean;

}


export class HomeState {

    @observable private homes!: Home[];
    @observable private refresh: boolean;




    constructor() {
        this.homes = [];
        this.refresh = true;

    }



    public getHomes(): Home[] {
        return this.homes;
    }

    @action
    public setHomes(homes: Home[]): void {
        this.homes = homes;
    }

    public addHome(home: Home): void {
        this.homes.push(home);
    }

    public removeHome(home: Home): void {
        this.homes = this.homes.filter(h => h.getId() !== home.getId());
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
