import { IHome } from "app/data/storage/home/home.model";
import { IFlatItemNotification } from "app/ui/screens/notification-component/FlatItemNotification";
import moment from "moment";

export const datesSettlementCheck = (homes: IHome[]) => {
    const datesSettlement = [];
    for (let i = 0; i < homes.length; i++) {
        const home = homes[i];
        for (let j = 0; j < home.flats.length; j++) {
            const settlement = home.flats[j].dateSettlement;
            datesSettlement.push(settlement.split('.')[0]);

        }
    }
    return datesSettlement;
}

export const checkNotificationFlat = (homes: IHome[]) => {
    const flat: IFlatItemNotification[] = [];

    for (let i = 0; i < homes.length; i++) {
        const home = homes[i];
        for (let j = 0; j < home.flats.length; j++) {
            const settlement = home.flats[j].dateSettlement;
            const owner = home.flats[j].owner;
            const address = home.flats[j].address;
            flat.push({
                settlementDay: settlement.split('.')[0],
                settlementDate: settlement,
                owner: owner,
                address: address,
            });
        }
    }
    return flat;
}

export const checkNotificationCanter = (homes: IHome[]) => {
    const dayNow = moment(new Date()).format('DD');
    const flat: IFlatItemNotification[] = [];
    let canterNotification: number = 0;

    for (let i = 0; i < homes.length; i++) {
        const home = homes[i];
        for (let j = 0; j < home.flats.length; j++) {
            const settlement = home.flats[j].dateSettlement;
            const owner = home.flats[j].owner;
            const address = home.flats[j].address;
            flat.push({
                settlementDay: settlement.split('.')[0],
                settlementDate: settlement,
                owner: owner,
                address: address,
            });
        }
    }
    flat.map((item, index) => {
        if (dayNow === item.settlementDay) {
            canterNotification = canterNotification + 1;
        } else {
            null;
        }
    });

    return canterNotification;

}