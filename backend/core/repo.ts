import uuid from 'uuid'
import {DB, DbChoreStatus, IChoreSchema, initLowDb} from "../infrastructure";
import {IChoreRepo} from "../repo.types";
import {find, getOr, map} from "lodash/fp";
import {IChore} from "../domain.types";
import {convertToDbStatus, convertToDomainChore, convertToDomainStatus} from "./transforms";


const makeChoreRepo = (db: DB): IChoreRepo => {
    const getChores = () => getOr([], 'data.chores', db)
    const findById = (choreId: String) => {
        const chores = getChores()
        const dbChore: IChoreSchema | undefined = find({_id: choreId}, chores)
        return dbChore
    }
    return {
        all: () => {
            const chores = getChores()
            const result: IChore[] = map(convertToDomainChore, chores)
            return result
        },
        byId: (choreId) => {
            const dbChore = findById(choreId)
            if (dbChore) {
                return {
                    choreId: dbChore._id,
                    createdAt: dbChore.createdAt,
                    status: convertToDomainStatus(dbChore.status, dbChore.createdAt),
                    title: dbChore.title, updatedAt: dbChore.updatedAt
                }
            }
            return 'ID_NOT_FOUND'
        },
        insert: (newChore) => {
            const dbChore: IChoreSchema = {
                _id: uuid.v4().toString(),
                updatedAt: new Date(),
                createdAt: new Date(),
                status: DbChoreStatus.TODO,
                title: newChore.title,
                auditTrail: []
            }
            db.data?.chores.push(dbChore)
            db.write().then(() => {
            })
            return convertToDomainChore(dbChore)
        },
        update: (update) => {
            const found = findById(update.choreId)
            if (!found) return 'ID_NOT_FOUND'
            const status = convertToDbStatus(update.status)
            found.auditTrail.push({title: found.title, status, dt: new Date()})
            const dbChore: IChoreSchema = {
                _id: found._id,
                updatedAt: new Date(),
                createdAt: found.createdAt,
                status,
                title: update.title,
                auditTrail: found.auditTrail,
            }
            if (db.data) {
                db.data.chores = map((chore) => {
                    if (chore._id === update.choreId) return dbChore
                    return chore
                }, db.data.chores)
            } else {
                db.data = {chores: [dbChore]}
            }
            db.write().then(() => {
            })

            return convertToDomainChore(dbChore)
        }
    }
}

export const choreRepo: IChoreRepo = makeChoreRepo(initLowDb())
