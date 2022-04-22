export type ChoreStatus = 'TODO' | 'DOING' | 'OVER_DUE' | 'COMPLETE'

export interface IChore {
    choreId: String
    title: String
    status: ChoreStatus
    createdAt: Date
    updatedAt: Date
}

export interface IChoreAuditTrail {
    _id: IChore["choreId"]
    title: IChore["title"]
    status: IChore["status"]
    dt: Date
}

export type CreateChoreCommand = Pick<IChore, 'title'>
export type UpdateChoreCommand = Pick<IChore, 'choreId' | 'title' | 'status'>

export type ID_NOT_FOUND = 'ID_NOT_FOUND'
export type DUPLICATE_CHORE = 'DUPLICATE_CHORE'
