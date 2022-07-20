import { observable } from "mobx";
import { Flat, IFlat } from "../flat/flat.model";

export interface IHome {
    index: number;
    id: string
    title: string;
    flats: IFlat[];

}

export class Home {

    @observable public index: number;

    @observable public id: string;

    @observable public title: string;

    @observable public flats!: IFlat[];


    constructor(home: IHome) {
        this.index = home && home.index;
        this.id = home && home.id as string;
        this.title = home && home.title as string;
        this.initFlats(home && home.flats || []);

    }

    public getIndex(): number {
        return this.index
    }

    public getId(): string {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public getFlats(): IFlat[] {
        return this.flats
    }

    public setFlats(flats: IFlat[]): void {
        this.flats = flats;
    }

    public addFlat(flat: IFlat): void {
        this.flats.push(flat);
    }

    public removeFlat(flat: IFlat): void {
        this.flats = this.flats.filter(f => f.getId() !== flat.getId());
    }

    public initFlats(flats: IFlat[]): void {
        if (!flats || flats.length === 0) {
            this.flats = [];
        }
        else {
            this.flats = flats.map(item => new Flat(item));
        }
    }

}
