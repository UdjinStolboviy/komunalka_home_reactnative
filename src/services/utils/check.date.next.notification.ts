import {
    checkNotificationFlat,
    datesSettlementCheck,
} from 'app/utils/check-notification';
import moment from 'moment';
import { IHome } from 'app/data/storage/home/home.model';


export const checkDateNextNotification = (homes: IHome[]) => {

    const datesSettlement = datesSettlementCheck(homes);
    const datesNow = moment(new Date()).format('YYYY-MM');
    const dayNow = moment(new Date()).format('DD');

    const dateNowSettlement = datesSettlement.map(date => {
        if (Number(date) >= 29) {
            return datesNow + '-' + '01';
        }
        return datesNow + '-' + date;
    });

    const addMonths = (date: string, months: number) => {
        return moment(date).add(months, 'month').format('YYYY-MM-DD');
    };

    const datesSettlementNext = (months: number, arr: string[]) =>
        arr.map(date => addMonths(date, months));

    const datesSettlementNextMonth = [
        ...dateNowSettlement,
        ...datesSettlementNext(1, dateNowSettlement),
    ];

    const dateNow = new Date(Date.now()).getTime();

    const dateNextPre = datesSettlementNextMonth.map(
        date => date + 'T09:00:21.583Z',
    );

    const dateNextPre2 = dateNextPre.map(date => new Date(date).getTime());
    const dateNextResult = dateNextPre2.sort((a, b) => a - b);

    const getNumber = (arr: number[], number: number) =>
        number < 0
            ? arr.filter(cur => cur <= number)[0]
            : arr.filter(cur => cur >= number)[0];

    const result = getNumber(dateNextResult, dateNow)
        ? getNumber(dateNextResult, dateNow)
        : dateNow + 60000;

    return moment(result).format('DD');

}
