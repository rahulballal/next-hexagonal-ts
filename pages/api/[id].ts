import {NextApiRequest, NextApiResponse} from "next";
import {ChoreService} from "../../backend/core";

export default function (req: NextApiRequest, res: NextApiResponse) {
    const choreSvc = ChoreService().get()
    const { id } = req.query
    const result = choreSvc.getChoreById(id as String)
    if (result === 'ID_NOT_FOUND') return res.status(404).json({})
    return res.status(200).json(result)
}
