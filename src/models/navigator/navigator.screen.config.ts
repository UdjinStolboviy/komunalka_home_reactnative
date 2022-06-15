export interface IScreen {
    name: string
    prev?: IScreen;
    next?: IScreen;
    params?: object;
}

export class Screen {

    private name: string;
    private prev?: Screen;
    private next?: Screen;
    private params?: object;

    constructor(name: string, params?: object) {
        this.name = name;
        this.params = params;
    }


    public getName(): string {
        return this.name;
    }


    public getPrev(): Screen | undefined {
        return this.prev
    }

    public setPrev(prev: Screen | undefined) {
        this.prev = prev;
    }

    public getNext(): Screen | undefined {
        return this.next
    }

    public setNext(next: Screen | undefined) {
        this.next = next;
    }

    public getParams(): object | undefined {
        return this.params;
    }

    public setParams(params: object | undefined) {
        this.params = params;
    }


}
