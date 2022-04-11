export type GraphData = {
    time: string,
    value: number
}

export type Room = {
    patientId: string,
    roomNumber: string,
    lastUpdated: string | undefined,
    heartRate: Array<GraphData> | undefined,
    breathingRate: Array<GraphData> | undefined,
    bloodPressure: Array<GraphData> | undefined,
    oxygenLevel: Array<GraphData> | undefined,
    notes: Array<GraphData> | undefined
}