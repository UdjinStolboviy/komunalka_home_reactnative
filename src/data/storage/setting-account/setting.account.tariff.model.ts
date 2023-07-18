import { action, observable } from "mobx";

export interface ISettingAccountTariffState {
    electricityTariff: number;
    waterTariff: number;
    internetTariff: number;
    rentTariff: number;
    garbageRemovalTariff: number;
}



export class SettingAccountTariffState {


    @observable private electricityTariff: number;
    @observable private waterTariff: number;
    @observable private internetTariff: number;
    @observable private rentTariff: number;
    @observable private garbageRemovalTariff: number;



    constructor() {
        this.electricityTariff = 2.64;
        this.waterTariff = 30.40;
        this.internetTariff = 70.00;
        this.rentTariff = 6500.00;
        this.garbageRemovalTariff = 50.00;

    }

    public getGarbageRemovalTariff(): number {
        return this.garbageRemovalTariff;
    }

    @action
    public setGarbageRemovalTariff(value: number) {
        this.garbageRemovalTariff = value;
    }

    public getElectricityTariff(): number {
        return this.electricityTariff;
    }

    @action
    public setElectricityTariff(value: number) {
        this.electricityTariff = value;
    }

    public getWaterTariff(): number {
        return this.waterTariff;
    }

    @action
    public setWaterTariff(value: number) {
        this.waterTariff = value;
    }

    public getInternetTariff(): number {
        return this.internetTariff;
    }

    @action
    public setInternetTariff(value: number) {
        this.internetTariff = value;
    }

    public getRentTariff(): number {
        return this.rentTariff;
    }

    @action
    public setRentTariff(value: number) {
        this.rentTariff = value;
    }


    @action
    public clearState() {
        this.electricityTariff = 0;
        this.waterTariff = 0;
        this.internetTariff = 0;
        this.rentTariff = 0;
        this.garbageRemovalTariff = 0;
    }
}
