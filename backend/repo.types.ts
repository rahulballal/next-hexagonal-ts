import {CreateChoreCommand, IChore, ID_NOT_FOUND, UpdateChoreCommand} from "./domain.types";

export interface IChoreRepo {
    insert: (newChore: CreateChoreCommand) => Promise<IChore>,
    update: (choreUpdate: UpdateChoreCommand) => Promise<IChore | ID_NOT_FOUND>,
    all: () => Promise<IChore[]>,
    byId: (choreId: IChore['choreId']) => Promise<IChore | ID_NOT_FOUND>
}
