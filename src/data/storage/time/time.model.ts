import { action, observable } from "mobx";

export interface ITimeState {
    timeForResendCode: number;

}


export class TimeState {

    @observable private timeForResendCode: number;




    constructor() {
        this.timeForResendCode = 0;

    }

    public getTimeForResendCode(): number {
        return this.timeForResendCode;
    }

    @action
    public setTimeForResendCode(value: number) {
        this.timeForResendCode = value;
    }


    @action
    public clearState() {
        this.timeForResendCode = 0;

    }
}
