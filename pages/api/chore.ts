// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ChoreService} from "../../backend/core";
import {CreateChoreCommand, UpdateChoreCommand} from "../../backend/domain.types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postBody =  req.body
  const choreSvc = ChoreService().get()
  switch (req.method) {
    case 'POST': {
      const result = choreSvc.addChore(postBody as CreateChoreCommand)
      if(result === 'DUPLICATE_CHORE') {
        return res.status(304)
      }
      return res.status(200).json(result)
    }
    case 'PUT': {
      return res.status(200).json(choreSvc.updateChore(postBody as UpdateChoreCommand))
    }
  }
}
