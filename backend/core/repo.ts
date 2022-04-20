import { map } from "lodash/fp";
import uuid from "uuid";
import { IChore } from "../domain.types";
import type {
  IChoreSchema,
  IChoresGateway
} from "../infrastructure";
import { choresGateway, DbChoreStatus } from "../infrastructure";
import { IChoreRepo } from "../repo.types";
import {
  convertToDbStatus,
  convertToDomainChore
} from "./transforms";

const makeChoreRepo = (gateway: IChoresGateway): IChoreRepo => {
  return {
    all: async () => {
      const chores = await gateway.getAll();
      const result: IChore[] = map(convertToDomainChore, chores);
      return result;
    },
    byId: async (choreId) => {
      try {
        const dbChore = await gateway.getOne(choreId);
        const result = convertToDomainChore(dbChore)
        return result
      } catch(e) {
        return 'ID_NOT_FOUND'
      }
    },
    insert: async (newChore) => {
      const dbChore: IChoreSchema = {
        _id: uuid.v4().toString(),
        updatedAt: (new Date()).toString(),
        createdAt: (new Date()).toString(),
        status: DbChoreStatus.TODO,
        title: newChore.title,
        auditTrail: [],
      };
      await gateway.create(dbChore)
      return convertToDomainChore(dbChore);
    },
    update: async (update) => {
      try {
        const found = await gateway.getOne(update.choreId)
        const status = convertToDbStatus(update.status);
        found.auditTrail.push({ title: found.title, status, dt: new Date() });
        const dbChore: IChoreSchema = {
          _id: found._id,
          updatedAt: (new Date()).toString(),
          createdAt: found.createdAt,
          status,
          title: update.title,
          auditTrail: found.auditTrail,
        };
        await gateway.update(dbChore)
        const result = convertToDomainChore(dbChore)
        return result
      }catch (e) {
        return 'ID_NOT_FOUND'
      }
    },
  };
};

export const choreRepo: IChoreRepo = makeChoreRepo(choresGateway);
