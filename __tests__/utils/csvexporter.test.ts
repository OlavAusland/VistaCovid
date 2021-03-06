import { getRoom } from "../../api/firebaseAPI";
import { GraphData, Room } from "../../domain/RoomType";
import moment, { Moment } from 'moment';
import { csvexport } from "../../utils/csvexport";

const date = moment("2022-05-15T21:11:48.620Z");

console.log(date);
const heartRate: GraphData[] = [
    {
        time: date.valueOf(),
        value: 100
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 90
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 80
    }
]

const respirationRate: GraphData[] = [
    {
        time: date.valueOf(),
        value: 95
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 85
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 75
    }
]

const oxygenLevel: GraphData[] = [
    {
        time: date.valueOf(),
        value: 50
    },
    {
        time: date.add(1, "minute").valueOf(),
        value: 40
    },
    {
        time: date.add(2, "minute").valueOf(),
        value: 30
    }
]

const mockRoomResponse: Room = {
    patientId: "123351",
    lastUpdated: new Date().toISOString(),
    heartRate,
    respirationRate: respirationRate,
    oxygenLevel,
    notes: undefined,
    id: "aaaa"
}

jest.mock("../../api/firebaseAPI");
jest.mock("../../utils/csvwriter");

// Tests with no given range, returns all data for a given room
test("Should export health data from firebase to CSV", async () => {
    // @ts-ignore
    getRoom.mockResolvedValueOnce(mockRoomResponse);

    console.log('response:', mockRoomResponse)
    
    const healthDataCSV = await csvexport(  ["A0 001"], undefined, undefined );
    console.log(healthDataCSV);
    expect(healthDataCSV).toBe("\"room\",\"time\",\"heartRate\",\"respirationRate\",\"oxygenLevel\"\n\"A0 001\",\"2022-05-15T21:14:48.620Z" 
        + "\",100,95,50\n\"A0 001\",\"2022-05-15T21:15:48.620Z\",90,85,40\n\"A0 001\",\"2022-05-15T21:17:48.620Z\",80,75,30");

});

// Tests with a given fromDate, returns all data after given date for a given room
test("Should export health data from firebase to CSV from date", async () => {
    // @ts-ignore
    getRoom.mockResolvedValueOnce(mockRoomResponse);

    console.log('response:', mockRoomResponse)

    const healthDataCSV = await csvexport( ["A0 001"],  moment('2022-05-15T21:15:48.620Z'),  undefined );
    console.log(healthDataCSV);
    expect(healthDataCSV).toBe("\"room\",\"time\",\"heartRate\",\"respirationRate\",\"oxygenLevel\"\n\"A0 001\",\"2022-05-15T21:15:48.620Z\",90,85,40\n\"A0 001\",\"2022-05-15T21:17:48.620Z\",80,75,30");

});

// Tests with a given toDate, returns all data before given date for a given room
test("Should export health data from firebase to CSV from date", async () => {
    // @ts-ignore
    getRoom.mockResolvedValueOnce(mockRoomResponse);

    console.log('response:', mockRoomResponse)

    const healthDataCSV = await csvexport(["A0 001"], undefined, moment('2022-05-15T21:15:48.620Z') );
    console.log(healthDataCSV);
    expect(healthDataCSV).toBe("\"room\",\"time\",\"heartRate\",\"respirationRate\",\"oxygenLevel\"\n\"A0 001\",\"2022-05-15T21:14:48.620Z" 
    + "\",100,95,50\n\"A0 001\",\"2022-05-15T21:15:48.620Z\",90,85,40");
});

// Tests with a given toDate, returns all data before given date for a given room
test("Should export health data from firebase to CSV from date", async () => {
    // @ts-ignore
    getRoom.mockResolvedValueOnce(mockRoomResponse);

    console.log('response:', mockRoomResponse)

    const healthDataCSV = await csvexport(["A0 001"], moment('2022-05-15T21:15:48.620Z'), moment('2022-05-15T21:15:48.620Z') );
    console.log(healthDataCSV);
    expect(healthDataCSV).toBe("\"room\",\"time\",\"heartRate\",\"respirationRate\",\"oxygenLevel\"\n\"A0 001\",\"2022-05-15T21:15:48.620Z\",90,85,40");
});