import { getRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';
import { Parser } from "json2csv";
import moment, { Moment } from 'moment';


type CsvData = {
    room: string,
    time: Moment,
    heartRate: number,
    respirationRate: number,
    oxygenLevel: number
}

export const csvexport = async (
    rooms: string[],
    fromDate: Moment | undefined,
    toDate: Moment | undefined
) => {
    const csvRooms: CsvData[] = [];
    for (const room of rooms) {
        const response = await getRoom(room);

        if (!response) {
            throw new Error(`Room ${room} does not exist`);
        }
        const data = mapHealthDataToElement(room, response, fromDate, toDate);
        csvRooms.push(...data);
    };

    // Write to CSV 
    const fields = ["room", "time", "heartRate", "respirationRate", "oxygenLevel"];
    const opts = { fields, eol: "\n" };
    let csv;
    try {
        const parser = new Parser(opts);
        csv = parser.parse(csvRooms);
        console.log("CSV: ", csv);
    } catch (e: any) {
        console.error(e);
        throw new Error(e);
    }

    //saveFile('data', csv);

    return csv;
}

const mapHealthDataToElement = (
    roomNumber: string,
    data: Room,
    fromDate: Moment | undefined,
    toDate: Moment | undefined
): CsvData[] => {
    if (data.respirationRate === undefined) {
        throw new Error(`Room ${roomNumber} does not have respiration rate data`);
    }

    return (data.respirationRate.flatMap((e: any, index: number) => {
        if (data.heartRate === undefined || data.oxygenLevel === undefined) {
            throw new Error(`Room ${roomNumber} does not have health data`);
        }
        const time = moment(e.time);

        console.log('csvinside time: ' + time);
        console.log('csvinside fromdate: ' + fromDate);
        console.log('csvinside todate: ' + toDate);

        if (!isWithinDateRange(time, fromDate, toDate)) {
            return [];
        }

        return ({
            room: roomNumber,
            time: moment(e.time),
            respirationRate: e.value,
            heartRate: data.heartRate[index].value,
            oxygenLevel: data.oxygenLevel[index].value
        });
    }));
}

const isWithinDateRange = (date: Moment, fromDate: Moment | undefined, toDate: Moment | undefined): boolean => {
    if (fromDate === undefined && toDate === undefined) {
        return true;
    } else if (fromDate === undefined && toDate !== undefined) {
        return date <= toDate;
    } else if (fromDate !== undefined && toDate === undefined) {
        return date >= fromDate;
    } else if (fromDate && toDate) {
        return date >= fromDate && date <= toDate;
    } else {
        throw new Error('Invalid date range');
    }
}
