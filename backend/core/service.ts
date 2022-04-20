import { IChoreRepo } from "../repo.types";
import { IChoreSvc } from "../service.type";

export const makeChoreSvc = (repo: IChoreRepo) => {
  const svc: IChoreSvc = {
    allChores: () => repo.all(),
    getChoreById: (choreId) => repo.byId(choreId),
    addChore: async (newChore) => {
      const allChores = await repo.all();
      const exists = allChores.some(
        ({ title }) => title.toLowerCase() === newChore.title.toLowerCase()
      );
      if (exists) return "DUPLICATE_CHORE";
      return repo.insert(newChore);
    },
    updateChore: (choreUpdate) => {
      return repo.update(choreUpdate);
    },
  };

  return svc;
};
