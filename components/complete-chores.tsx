import {map} from "lodash/fp";
import React from "react";
import type {IChore} from '../pages/index'
import {List, ListIcon, ListItem} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

interface ITodoChoresProps {
    chores: IChore[]
}

export const CompleteChores: React.FC<ITodoChoresProps> = (props) => {
    const items = map((chore: IChore) => (<ListItem><ListIcon as={CheckIcon} color={"darkorange"}/>{chore.title}</ListItem>), props.chores)
    return <List spacing={3} padding={"1.5"}>{items}</List>
}
