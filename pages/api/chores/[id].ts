import { getOr } from "lodash/fp";
import { NextApiRequest, NextApiResponse } from "next";
import { SingleChore } from "../../../backend/api.types";
import { ChoreService } from "../../../backend/core";
import { UpdateChoreCommand } from "../../../backend/domain.types";

export default async function handleGetChoreById(
  req: NextApiRequest,
  res: NextApiResponse<SingleChore>
) {
  const httpMethod = req.method;
  const choreSvc = ChoreService().get();
  const id: String = getOr("", "query.id", req);
  const postBody = req.body;
  switch (httpMethod) {
    case "GET": {
      const result = await choreSvc.getChoreById(id as String);
      if (result === "ID_NOT_FOUND") return res.status(404).end();
      return res.status(200).json({ data: result });
    }
    case "PUT": {
      const posted = postBody as Omit<UpdateChoreCommand, "choreId">;
      const command: UpdateChoreCommand = { choreId: id, ...posted };
      const result = await choreSvc.updateChore(command);
      if (result === "ID_NOT_FOUND") return res.status(404).end();
      return res.status(200).json({ data: result });
    }
  }
}
