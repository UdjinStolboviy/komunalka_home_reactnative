import { action, observable } from "mobx";


export class CalculatorState {

    @observable private multiplicationElectricity: number;
    @observable private multiplicationWater: number;
    @observable private resultElectricity: number;
    @observable private resultWater: number;
    @observable private resultOtherOption: number;
    @observable private comments: string;
    @observable private messageElectricity: string;
    @observable private messageWater: string;
    @observable private enableOtherOptions: boolean;
    @observable private enableComments: boolean;



    constructor() {
        this.multiplicationElectricity = 0;
        this.multiplicationWater = 0;
        this.resultElectricity = 0;
        this.resultWater = 0;
        this.resultOtherOption = 0;
        this.comments = '';
        this.messageElectricity = '';
        this.messageWater = '';
        this.enableOtherOptions = false;
        this.enableComments = false;
    }

    public getMultiplicationElectricity(): number {
        return this.multiplicationElectricity;
    }

    @action
    public setMultiplicationElectricity(value: number) {
        this.multiplicationElectricity = value;
    }

    public getMultiplicationWater(): number {
        return this.multiplicationWater;
    }

    @action
    public setMultiplicationWater(value: number) {
        this.multiplicationWater = value;
    }

    public getResultElectricity(): number {
        return this.resultElectricity;
    }

    @action
    public setResultElectricity(value: number) {
        this.resultElectricity = value;
    }

    public getResultWater(): number {
        return this.resultWater;
    }

    @action
    public setResultWater(value: number) {
        this.resultWater = value;
    }

    public getResultOtherOption(): number {
        return this.resultOtherOption;
    }

    @action
    public setResultOtherOption(value: number) {
        this.resultOtherOption = value;
    }

    public getComments(): string {
        return this.comments;
    }

    @action
    public setComments(value: string) {
        this.comments = value;
    }

    public getMessageElectricity(): string {
        return this.messageElectricity;
    }

    @action
    public setMessageElectricity(value: string) {
        this.messageElectricity = value;
    }

    public getMessageWater(): string {
        return this.messageWater;
    }

    @action
    public setMessageWater(value: string) {
        this.messageWater = value;
    }

    public getEnableOtherOptions(): boolean {
        return this.enableOtherOptions;
    }

    @action
    public setEnableOtherOptions(value: boolean) {
        this.enableOtherOptions = value;
    }

    public getEnableComments(): boolean {
        return this.enableComments;
    }

    @action
    public setEnableComments(value: boolean) {
        this.enableComments = value;
    }

    @action
    public clearState() {
        this.multiplicationElectricity = 0;
        this.multiplicationWater = 0;
        this.resultElectricity = 0;
        this.resultWater = 0;
        this.resultOtherOption = 0;
        this.comments = '';
        this.messageElectricity = '';
        this.messageWater = '';
        this.enableOtherOptions = false;
        this.enableComments = false;
    }
}
