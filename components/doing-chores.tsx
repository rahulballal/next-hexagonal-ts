import {map} from "lodash/fp";
import React from "react";
import type {IChore} from '../pages/index'
import {List, ListIcon, ListItem} from "@chakra-ui/react";
import {RepeatClockIcon} from "@chakra-ui/icons";

interface ITodoChoresProps {
    chores: IChore[]
    updateChore: (choreId: string, update: IChore) => void
}

export const DoingChores: React.FC<ITodoChoresProps> = (props) => {
    const items = map((chore: IChore) => (<ListItem><ListIcon as={RepeatClockIcon} color={chore.status=== 'OVER_DUE' ? "red": "aqua"}/>{chore.title}</ListItem>), props.chores)
    return <List spacing={3} padding={"1.5"}>{items}</List>
}
