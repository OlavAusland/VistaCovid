import { Parser } from "json2csv";
import { getRoom } from '../api/firebaseAPI';
import { Room } from '../domain/RoomType';


type csvProps = {
    rooms: string[];
    fromDate?: Date;
    toDate?: Date;
}

type CsvData = {
    room: string,
    time: Date,
    heartRate: number,
    bloodPressure: number,
    oxygenLevel: number
}

export const csvexport = async (props: csvProps) => {
    const rooms: CsvData[] = [];
    for (const room of props.rooms) {
        const response = await getRoom(room);

        if (!response) {
            throw new Error(`Room ${room} does not exist`);
        }
        const data = mapHealthDataToElement(room, response, props.fromDate, props.toDate);
        rooms.push(...data);
    };

    // Write to CSV 
    const fields = ["room", "time", "heartRate", "bloodPressure", "oxygenLevel"];
    const opts = { fields, eol: "\n" };
    let csv;
    try {
        const parser = new Parser(opts);
        csv = parser.parse(rooms);
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
    fromDate: Date | undefined,
    toDate: Date | undefined
): CsvData[] => {
    if (data.bloodPressure === undefined) {
        throw new Error(`Room ${roomNumber} does not have blood pressure data`);
    }

    return (data.bloodPressure.flatMap((e: any, index: number) => {
        if (data.heartRate === undefined || data.oxygenLevel === undefined) {
            throw new Error(`Room ${roomNumber} does not have health data`);
        }
        const time = new Date(e.time);

        if (!isWithinDateRange(time, fromDate, toDate)) {
            return [];
        }

        return ({
            room: roomNumber,
            time: new Date(e.time),
            bloodPressure: e.value,
            heartRate: data.heartRate[index].value,
            oxygenLevel: data.oxygenLevel[index].value
        });
    }));
}

const isWithinDateRange = (date: Date, fromDate: Date | undefined, toDate: Date | undefined): boolean => {
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
