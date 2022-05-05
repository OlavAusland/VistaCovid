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
    roomNumber: string,
    lastUpdated: string | undefined,
    heartRate: Array<GraphData> | undefined,
    bloodPressure: Array<GraphData> | undefined,
    oxygenLevel: Array<GraphData> | undefined,
    notes: Array<NoteData> | undefined
}