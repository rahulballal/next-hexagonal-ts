import * as low from 'lowdb'

export enum DbChoreStatus {
    TODO,
    IN_PROGRESS,
    COMPLETE
}
export interface IChoreSchema {
    _id: String
    title: String
    status: DbChoreStatus
    createdAt: Date
    updatedAt: Date
    auditTrail: Array<Pick<IChoreSchema, 'title'| 'status'> & {dt: Date}>
}

export interface IData {
    chores: IChoreSchema[]
}

export function initLowDb(){
    const adapter = new low.JSONFile<IData>('db.json')
    const db = new low.Low<IData>(adapter)
    return db
}

export type DB = ReturnType<typeof initLowDb>


