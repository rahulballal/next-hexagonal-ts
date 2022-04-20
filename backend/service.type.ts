import {CreateChoreCommand, IChore, ID_NOT_FOUND, UpdateChoreCommand} from "./domain.types";

export interface IChoreSvc {
    addChore: (newChore: CreateChoreCommand) => Promise<IChore| 'DUPLICATE_CHORE'>,
    updateChore: (choreUpdate: UpdateChoreCommand) => Promise<IChore | ID_NOT_FOUND>,
    allChores: () => Promise<IChore[]>,
    getChoreById: (choreId: IChore['choreId']) => Promise<IChore | ID_NOT_FOUND>
}
