import {NextApiRequest, NextApiResponse} from "next";
import {ChoreService} from "../../backend/core";

export default function (req: NextApiRequest, res: NextApiResponse) {
    const choreSvc = ChoreService().get()
    return res.status(200).json(choreSvc.allChores())
}
