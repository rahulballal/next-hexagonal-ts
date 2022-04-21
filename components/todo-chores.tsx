import {map} from "lodash/fp";
import React from "react";
import type {IChore} from '../pages/index'

interface ITodoChoresProps {
    chores: IChore[]
    updateChore: (choreId: string, update: IChore) => void
}

export const TodoChores: React.FC<ITodoChoresProps> = (props) => {
    const items = map((chore: IChore) => (<div>{chore.title}</div>), props.chores)
    return <>{items}</>
}
