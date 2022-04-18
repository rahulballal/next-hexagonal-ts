import {CreateChoreCommand, IChore, ID_NOT_FOUND, UpdateChoreCommand} from "./domain.types";

export interface IChoreSvc {
    addChore: (newChore: CreateChoreCommand) => IChore| 'DUPLICATE_CHORE',
    updateChore: (choreUpdate: UpdateChoreCommand) => IChore | ID_NOT_FOUND,
    allChores: () => IChore[],
    getChoreById: (choreId: IChore['choreId']) => IChore | ID_NOT_FOUND
}
