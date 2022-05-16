import { Roles } from "./UserType"

export type GraphData = {
    time: number,
    value: number
}

export type NoteData = {
    role: string,
    note: string
}

export type Room = {
    patientId: string,
    lastUpdated: string | undefined,
    heartRate: Array<GraphData> 
    bloodPressure: Array<GraphData> 
    oxygenLevel: Array<GraphData> 
    notes: Array<NoteData> | undefined,
    id: string
}

export type csvrooms = {
    data: Array<helthData>
}

type helthData = {
    bloodPressure: Array<GraphData> 
    heartRate: Array<GraphData>
    oxygenLevel: Array<GraphData>
}


