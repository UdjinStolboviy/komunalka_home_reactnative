import { observable } from "mobx";

export interface IFlatCalculator {
    index: number;
    id: string;
    dateCalculator: string;
    currentDataElectricity: number;
    currentDataWater: number;
    preliminaryDataElectricity: number;
    preliminaryDataWater: number;
    resultElectricity: number;
    messageElectricity: string;
    electricityTariff: number;
    multiplicationElectricity: number;
    resultWater: number;
    messageWater: string;
    waterTariff: number;
    multiplicationWater: number;
    resultInternet: number;
    garbageRemovalTariff: number;
    resultAllUtilityPayments: number;
    resultRent: number;
    resultOtherOptions: number;
    comments: string;
    resultAllCalculate: number;
}

export class FlatCalculator {

    @observable
    private index: number;

    @observable
    private id: string;

    @observable
    private dateCalculator: string;

    @observable
    private currentDataElectricity: number;

    @observable
    private currentDataWater: number;

    @observable
    private preliminaryDataElectricity: number;

    @observable
    private preliminaryDataWater: number;

    @observable
    private resultElectricity: number;

    @observable
    private messageElectricity: string;

    @observable
    private electricityTariff: number;

    @observable
    private multiplicationElectricity: number;

    @observable
    private resultWater: number;

    @observable
    private messageWater: string;

    @observable
    private waterTariff: number;

    @observable
    private multiplicationWater: number;

    @observable
    private resultInternet: number;

    @observable
    private garbageRemovalTariff: number;

    @observable
    private resultAllUtilityPayments: number;

    @observable
    private resultRent: number;

    @observable
    private resultOtherOptions: number;

    @observable
    private comments: string;

    @observable
    private resultAllCalculate: number;






    constructor(flatCalculator: IFlatCalculator) {
        this.index = flatCalculator && flatCalculator.index;
        this.id = flatCalculator && flatCalculator.id;
        this.dateCalculator = flatCalculator && flatCalculator.dateCalculator;
        this.currentDataElectricity = flatCalculator && flatCalculator.currentDataElectricity;
        this.currentDataWater = flatCalculator && flatCalculator.currentDataWater;
        this.preliminaryDataElectricity = flatCalculator && flatCalculator.preliminaryDataElectricity;
        this.preliminaryDataWater = flatCalculator && flatCalculator.preliminaryDataWater;
        this.resultElectricity = flatCalculator && flatCalculator.resultElectricity;
        this.messageElectricity = flatCalculator && flatCalculator.messageElectricity as string;
        this.electricityTariff = flatCalculator && flatCalculator.electricityTariff;
        this.multiplicationElectricity = flatCalculator && flatCalculator.multiplicationElectricity;
        this.resultWater = flatCalculator && flatCalculator.resultWater;
        this.messageWater = flatCalculator && flatCalculator.messageWater;
        this.waterTariff = flatCalculator && flatCalculator.waterTariff;
        this.multiplicationWater = flatCalculator && flatCalculator.multiplicationWater;
        this.resultInternet = flatCalculator && flatCalculator.resultInternet;
        this.garbageRemovalTariff = flatCalculator && flatCalculator.garbageRemovalTariff;
        this.resultAllUtilityPayments = flatCalculator && flatCalculator.resultAllUtilityPayments;
        this.resultRent = flatCalculator && flatCalculator.resultRent;
        this.resultOtherOptions = flatCalculator && flatCalculator.resultOtherOptions;
        this.comments = flatCalculator && flatCalculator.comments as string;
        this.resultAllCalculate = flatCalculator && flatCalculator.resultAllCalculate;

    }

    public getIndex(): number {
        return this.index
    }

    public getId(): string {
        return this.id
    }

    public getDateCalculator(): string {
        return this.dateCalculator
    }

    public getCurrentDataElectricity(): number {
        return this.currentDataElectricity
    }

    public getCurrentDataWater(): number {
        return this.currentDataWater
    }

    public getPreliminaryDataElectricity(): number {
        return this.preliminaryDataElectricity
    }

    public getPreliminaryDataWater(): number {
        return this.preliminaryDataWater
    }

    public getResultElectricity(): number {
        return this.resultElectricity
    }

    public getMessageElectricity(): string {
        return this.messageElectricity
    }

    public getElectricityTariff(): number {
        return this.electricityTariff
    }

    public getMultiplicationElectricity(): number {
        return this.multiplicationElectricity
    }

    public getResultWater(): number {
        return this.resultWater
    }

    public getMessageWater(): string {
        return this.messageWater
    }

    public getWaterTariff(): number {
        return this.waterTariff
    }

    public getMultiplicationWater(): number {
        return this.multiplicationWater
    }

    public getResultInternet(): number {
        return this.resultInternet
    }

    public getGarbageRemovalTariff(): number {
        return this.garbageRemovalTariff
    }

    public getResultAllUtilityPayments(): number {
        return this.resultAllUtilityPayments
    }

    public getResultRent(): number {
        return this.resultRent
    }

    public getResultOtherOptions(): number {
        return this.resultOtherOptions
    }

    public getComments(): string {
        return this.comments
    }

    public getResultAllCalculate(): number {
        return this.resultAllCalculate
    }

    public setIndex(index: number): void {
        this.index = index
    }

    public setId(id: string): void {
        this.id = id
    }

    public setDateCalculator(dateCalculator: string): void {
        this.dateCalculator = dateCalculator
    }

    public setCurrentDataElectricity(currentDataElectricity: number): void {
        this.currentDataElectricity = currentDataElectricity
    }

    public setCurrentDataWater(currentDataWater: number): void {
        this.currentDataWater = currentDataWater
    }

    public setPreliminaryDataElectricity(preliminaryDataElectricity: number): void {
        this.preliminaryDataElectricity = preliminaryDataElectricity
    }

    public setPreliminaryDataWater(preliminaryDataWater: number): void {
        this.preliminaryDataWater = preliminaryDataWater
    }

    public setResultElectricity(resultElectricity: number): void {
        this.resultElectricity = resultElectricity
    }

    public setMessageElectricity(messageElectricity: string): void {
        this.messageElectricity = messageElectricity
    }

    public setElectricityTariff(electricityTariff: number): void {
        this.electricityTariff = electricityTariff
    }

    public setMultiplicationElectricity(multiplicationElectricity: number): void {
        this.multiplicationElectricity = multiplicationElectricity
    }

    public setResultWater(resultWater: number): void {
        this.resultWater = resultWater
    }

    public setMessageWater(messageWater: string): void {
        this.messageWater = messageWater
    }

    public setWaterTariff(waterTariff: number): void {
        this.waterTariff = waterTariff
    }

    public setMultiplicationWater(multiplicationWater: number): void {
        this.multiplicationWater = multiplicationWater
    }

    public setResultInternet(resultInternet: number): void {
        this.resultInternet = resultInternet
    }

    public setGarbageRemovalTariff(garbageRemovalTariff: number): void {
        this.garbageRemovalTariff = garbageRemovalTariff
    }

    public setResultAllUtilityPayments(resultAllUtilityPayments: number): void {
        this.resultAllUtilityPayments = resultAllUtilityPayments
    }

    public setResultRent(resultRent: number): void {
        this.resultRent = resultRent
    }

    public setResultOtherOptions(resultOtherOptions: number): void {
        this.resultOtherOptions = resultOtherOptions
    }

    public setComments(comments: string): void {
        this.comments = comments
    }

    public setResultAllCalculate(resultAllCalculate: number): void {
        this.resultAllCalculate = resultAllCalculate
    }


}
