
export type GraphData = {
    time: number,
    value: number
}

export type NoteData = {
    author: string,
    note: string,
    date: number
}

export type Room = {
    patientId: string,
    lastUpdated: string | undefined,
    heartRate: Array<GraphData> 
    respirationRate: Array<GraphData> 
    oxygenLevel: Array<GraphData> 
    notes: Array<NoteData> | undefined,
    id: string
}

export type csvrooms = {
    data: Array<helthData>
}

type helthData = {
    respirationRate: Array<GraphData> 
    heartRate: Array<GraphData>
    oxygenLevel: Array<GraphData>
}


