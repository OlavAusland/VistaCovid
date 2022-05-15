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
    heartRate: Array<GraphData>,
    bloodPressure: Array<GraphData>,
    oxygenLevel: Array<GraphData>,
    notes: Array<NoteData>,
    id: string
}