import {map} from "lodash/fp";
import React from "react";
import type {IChore} from '../pages/index'

interface ITodoChoresProps {
    chores: IChore[]
    updateChore: (choreId: string, update: IChore) => void
}

export const DoingChores: React.FC<ITodoChoresProps> = (props) => {
    const items = map((chore: IChore) => (
        <div>{chore.title}{`${chore.status === 'OVER_DUE' ? '***' : ''}`}</div>), props.chores)
    return <>{items}</>
}
