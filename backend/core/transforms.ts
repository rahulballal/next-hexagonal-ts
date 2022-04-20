import differenceInCalendarDays from "date-fns/fp/differenceInCalendarDays";
import {DbChoreStatus, IChoreSchema} from "../infrastructure";
import {ChoreStatus, IChore} from "../domain.types";

export const isPastDue = (date: Date) => {
    const diffInDays = differenceInCalendarDays(date, new Date())
    return diffInDays >= 2
}

export const convertToDomainStatus = (dbStatus: DbChoreStatus, updatedAt: IChore['createdAt']): ChoreStatus => {
    switch (dbStatus) {
        case DbChoreStatus.IN_PROGRESS: {
            return isPastDue(updatedAt) ? 'OVER_DUE' : 'DOING'
        }
        case DbChoreStatus.COMPLETE: {
            return 'COMPLETE'
        }
        case DbChoreStatus.TODO: {
            return 'TODO'
        }
    }
}

export const convertToDbStatus = (domStatus: ChoreStatus) => {
    switch (domStatus) {
        case "COMPLETE": {
            return DbChoreStatus.COMPLETE
        }
        case "OVER_DUE":
        case "DOING": {
            return DbChoreStatus.IN_PROGRESS
        }
        case "TODO": {
            return DbChoreStatus.TODO
        }
    }
}

export const convertToDomainChore = (dbChore: IChoreSchema): IChore => ({
    choreId: dbChore._id,
    createdAt: new Date(dbChore.createdAt as string),
    status: convertToDomainStatus(dbChore.status, new Date(dbChore.updatedAt as string)),
    title: dbChore.title,
    updatedAt: new Date(dbChore.updatedAt as string)
})
