// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SingleChore, ManyChores } from "../../../backend/api.types";
import { ChoreService } from "../../../backend/core";
import { CreateChoreCommand, IChore } from "../../../backend/domain.types";

export default async function handlePutPostChore(
  req: NextApiRequest,
  res: NextApiResponse<SingleChore | ManyChores>
) {
  const postBody = req.body;
  const choreSvc = ChoreService().get();
  switch (req.method) {
    case "POST": {
      const result = await choreSvc.addChore(postBody as CreateChoreCommand);
      if (result === "DUPLICATE_CHORE") {
        return res.status(304);
      }
      return res.status(200).json({ data: result });
    }
    case "GET": {
      const all = await choreSvc.allChores();
      return res.status(200).json({ data: all });
    }
  }
}
