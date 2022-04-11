export type Room = {
    patientId: string,
    roomNumber: string,
    lastUpdated: string | undefined,
    heartRate: Array<Object> | undefined,
    breathingRate: Array<Object> | undefined,
    bloodPressure: Array<Object> | undefined,
    oxygenLevel: Array<Object> | undefined,
    notes: Array<Object> | undefined
}