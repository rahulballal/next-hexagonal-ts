import {choreRepo} from './repo'
import {IChoreSvc} from "../service.type";
import {makeChoreSvc} from "./service";

let svc: IChoreSvc | null = null

export const ChoreService = () => {
    return {
        get(){
            if(!svc) {
                svc = makeChoreSvc(choreRepo)
            }
            return svc
        }
    }
}
