import {CreateChoreCommand, IChore, ID_NOT_FOUND, UpdateChoreCommand} from "./domain.types";

export interface IChoreRepo {
    insert: (newChore: CreateChoreCommand) => IChore,
    update: (choreUpdate: UpdateChoreCommand) => IChore | ID_NOT_FOUND,
    all: () => IChore[],
    byId: (choreId: IChore['choreId']) => IChore | ID_NOT_FOUND
}
