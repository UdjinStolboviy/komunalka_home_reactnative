import { action, observable } from "mobx";

export interface IMarkedNotification {
    date: string;

}

export interface IMarked {
    type: string;
}

export class MarkedNotification {
    date: string;
    type: string;

    // @observable public date: string;
    // @observable public type: string;
    constructor(date: string, type: string) {
        this.date = date;
        this.type = type;
    }


}
