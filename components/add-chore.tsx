import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React from "react";

export function AddChore() {
    const [choreTitle, setChoreTitle] = React.useState("");
    return (
      <>
        <FormControl>
          <FormLabel htmlFor="choreTitle">Add Chore</FormLabel>
          <Input
            id="choreTitle"
            onChange={(e) => {
              setChoreTitle(e.target.value);
            }}
            value={choreTitle}
          />
        </FormControl>
        <Button colorScheme="cyan">Add</Button>
      </>
    );
}