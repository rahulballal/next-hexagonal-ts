import {map} from "lodash/fp";
import React from "react";
import type {IChore} from '../pages/index'
import {List, ListIcon, ListItem} from "@chakra-ui/react";
import { BellIcon } from '@chakra-ui/icons'

interface ITodoChoresProps {
    chores: IChore[]
    updateChore: (choreId: string, update: IChore) => void
}

export const TodoChores: React.FC<ITodoChoresProps> = (props) => {
    const items = map((chore: IChore) => (<ListItem><ListIcon as={BellIcon} color={"purple.300"}/>{chore.title}</ListItem>), props.chores)
    return <List spacing={3} padding={"1.5"}>{items}</List>
}
