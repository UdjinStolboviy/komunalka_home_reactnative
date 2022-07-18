import { action, observable } from "mobx";
import { FlatCalculator, IFlatCalculator } from "./flat.calculator.model";
import { IFlatImage, FlatImage } from "./flat.image.model";

export interface IFlat {
    index: number;
    images?: IFlatImage[];
    calculatorFlat: IFlatCalculator[];
    id: string;
    title: string;
    price: number;
    area: number;
    rooms: number;
    dateSettlement: string;
    dateEviction: string;
    description: string;
    wifiName: string;
    wifiPassword: string;
    address: string;
    occupant: string;
    phoneOccupant: string;
    emailOccupant: string;
    owner: string;
    ownerPhone: string;
    ownerEmail: string;
    floor: number;
}

export class Flat {

    @observable private index: number;
    @observable private images!: FlatImage[];
    @observable public calculatorFlat!: FlatCalculator[];
    @observable private id: string;
    @observable private title: string;
    @observable public price: number;
    @observable private area: number;
    @observable private rooms: number;
    @observable private dateSettlement: string;
    @observable private dateEviction: string;
    @observable private description: string;
    @observable private wifiName: string;
    @observable private wifiPassword: string;
    @observable private address: string;
    @observable private occupant: string;
    @observable private phoneOccupant: string;
    @observable private emailOccupant: string;
    @observable private owner: string;
    @observable private ownerPhone: string;
    @observable private ownerEmail: string;
    @observable private floor: number;

    constructor(flat: IFlat) {
        this.index = flat && flat.index;
        this.initImages(flat && flat.images || []);
        this.initFlatCalculator(flat && flat.calculatorFlat || []);
        this.id = flat && flat.id as string;
        this.title = flat && flat.title as string;
        this.price = flat && flat.price as number;
        this.area = flat && flat.area as number;
        this.rooms = flat && flat.rooms as number;
        this.dateSettlement = flat && flat.dateSettlement as string;
        this.dateEviction = flat && flat.dateEviction as string;
        this.description = flat && flat.description as string;
        this.wifiName = flat && flat.wifiName as string;
        this.wifiPassword = flat && flat.wifiPassword as string;
        this.address = flat && flat.address as string;
        this.occupant = flat && flat.occupant as string;
        this.phoneOccupant = flat && flat.phoneOccupant as string;
        this.emailOccupant = flat && flat.emailOccupant as string;
        this.owner = flat && flat.owner as string;
        this.ownerPhone = flat && flat.ownerPhone as string;
        this.ownerEmail = flat && flat.ownerEmail as string;
        this.floor = flat && flat.floor as number
    }

    public getIndex(): number {
        return this.index
    }

    public getId(): string {
        return this.id
    }

    @action
    public setId(id: string): void {
        this.id = id;
    }

    @action
    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title
    }

    public getPrice(): number {
        return this.price
    }

    @action
    public setPrice(price: number): void {
        this.price = price;
    }

    public getArea(): number {
        return this.area
    }

    @action
    public setArea(area: number): void {
        this.area = area;
    }

    public getRooms(): number {
        return this.rooms
    }

    @action
    public setRooms(rooms: number): void {
        this.rooms = rooms;
    }

    public getDateSettlement(): string {
        return this.dateSettlement
    }

    @action
    public setDateSettlement(dateSettlement: string): void {
        this.dateSettlement = dateSettlement;
    }

    public getDateEviction(): string {
        return this.dateEviction
    }

    @action
    public setDateEviction(dateEviction: string): void {
        this.dateEviction = dateEviction;
    }

    public getDescription(): string {
        return this.description
    }

    @action
    public setDescription(description: string): void {
        this.description = description;
    }

    public getWifiName(): string {
        return this.wifiName
    }

    @action
    public setWifiName(wifiName: string): void {
        this.wifiName = wifiName;
    }

    public getWifiPassword(): string {
        return this.wifiPassword
    }

    @action
    public setWifiPassword(wifiPassword: string): void {
        this.wifiPassword = wifiPassword;
    }

    public getAddress(): string {
        return this.address
    }

    @action
    public setAddress(address: string): void {
        this.address = address;
    }

    public getOccupant(): string {
        return this.occupant
    }

    @action
    public setOccupant(occupant: string): void {
        this.occupant = occupant;
    }

    public getPhoneOccupant(): string {
        return this.phoneOccupant
    }

    @action
    public setPhoneOccupant(phoneOccupant: string): void {
        this.phoneOccupant = phoneOccupant;
    }

    public getEmailOccupant(): string {
        return this.emailOccupant
    }

    @action
    public setEmailOccupant(emailOccupant: string): void {
        this.emailOccupant = emailOccupant;
    }

    public getOwner(): string {
        return this.owner
    }

    @action
    public setOwner(owner: string): void {
        this.owner = owner;
    }

    public getOwnerPhone(): string {
        return this.ownerPhone
    }

    @action
    public setOwnerPhone(ownerPhone: string): void {
        this.ownerPhone = ownerPhone;
    }


    public getOwnerEmail(): string {
        return this.ownerEmail
    }

    @action
    public setOwnerEmail(ownerEmail: string): void {
        this.ownerEmail = ownerEmail;
    }

    public getImages(): FlatImage[] {
        return this.images
    }

    @action
    public setImages(images: FlatImage[]): void {
        this.images = images;
    }

    public getFlatCalculator(): FlatCalculator[] {
        return this.calculatorFlat
    }

    @action
    public setFlatCalculator(calculatorFlat: FlatCalculator[]): void {
        this.calculatorFlat = calculatorFlat;
    }

    public getFloor(): number {
        return this.floor
    }

    @action
    public setFloor(floor: number): void {
        this.floor = floor;
    }


    private initImages(images: IFlatImage[]) {
        if (!images || images.length === 0) {
            this.images = [];
        } else {
            this.images = images.map(item => new FlatImage(item));
        }
    }

    private initFlatCalculator(calculator: IFlatCalculator[]) {
        if (!calculator || calculator.length === 0) {
            this.calculatorFlat = [];
        } else {
            this.calculatorFlat = calculator.map(item => new FlatCalculator(item));
        }
    }
}
