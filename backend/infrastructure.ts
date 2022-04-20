import got from "got";
export enum DbChoreStatus {
  TODO,
  IN_PROGRESS,
  COMPLETE,
}
export interface IChoreSchema {
  _id: String;
  title: String;
  status: DbChoreStatus;
  createdAt: String;
  updatedAt: String;
  auditTrail: Array<Pick<IChoreSchema, "title" | "status"> & { dt: Date }>;
}

export interface IChoresGateway {
  getAll: () => Promise<IChoreSchema[]>
  getOne: (choreId: String) => Promise<IChoreSchema>
  create: (chore: IChoreSchema) => Promise<void>
  update: (chore: IChoreSchema) => Promise<void>
}

class ChoresDbGateway implements IChoresGateway {
  constructor(private readonly dbUrl = "http://localhost:5000/chores") {}

  async getAll(): Promise<IChoreSchema[]> {
    const response: IChoreSchema[] = await got.get(this.dbUrl).json();
    return response;
  }

  async getOne(choreId: String): Promise<IChoreSchema> {
    const response: IChoreSchema = await got
      .get(this.dbUrl + "/" + choreId)
      .json();
    return response;
  }

  async create(newChore: IChoreSchema): Promise<void> {
    await got.post(this.dbUrl, { body: JSON.stringify(newChore) }).json();
  }

  async update(updatedChore: IChoreSchema): Promise<void> {
    await got
      .put(this.dbUrl + "/" + updatedChore._id, {
        body: JSON.stringify(updatedChore),
      })
      .json();
  }
}

export const choresGateway = new ChoresDbGateway()
