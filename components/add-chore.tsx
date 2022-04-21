import {FormControl, Input, Button} from "@chakra-ui/react";
import React from "react";

interface IAddChoreProps {
    onAdd: ({choreTitle}: { choreTitle: string }) => void
}

export const AddChore: React.FC<IAddChoreProps> = ({onAdd}) => {
    const [choreTitle, setChoreTitle] = React.useState("");
    return (
        <>
            <FormControl>
                <Input
                    id="choreTitle"
                    onChange={(e) => {
                        setChoreTitle(e.target.value);
                    }}
                    value={choreTitle}
                />
            </FormControl>
            <br/>
            <Button colorScheme="cyan" onClick={() => onAdd({choreTitle})}>Add Chore</Button>
        </>
    );
}
