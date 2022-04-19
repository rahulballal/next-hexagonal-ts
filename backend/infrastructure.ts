import { v4 } from "uuid";
export enum DbChoreStatus {
  TODO,
  IN_PROGRESS,
  COMPLETE,
}
export interface IChoreSchema {
  _id: String;
  title: String;
  status: DbChoreStatus;
  createdAt: Date;
  updatedAt: Date;
  auditTrail: Array<Pick<IChoreSchema, "title" | "status"> & { dt: Date }>;
}

export interface IData {
  chores: IChoreSchema[];
}

let db: IData  =  {
    chores: [
      {
        _id: v4().toString(),
        auditTrail: [],
        createdAt: new Date(),
        status: DbChoreStatus.TODO,
        title: "Remember the milk",
        updatedAt: new Date(),
      },
    ],
  };
export function getDb() {
    return db
}
