import {
    Box,
    Container,
    Heading,
    StackDivider,
    VStack,
    Text,
} from "@chakra-ui/react";
import type {NextPage} from "next";
import Head from "next/head";
import React, {useCallback, useEffect, useState} from "react";
import {AddChore} from "../components/add-chore";
import {TodoChores} from "../components/todo-chores";
import {useFetch} from "use-http";
import {filter} from "lodash/fp";
import {CompleteChores} from "../components/complete-chores";
import {DoingChores} from "../components/doing-chores";

export interface IChore {
    choreId: String
    title: String
    status: 'TODO' | 'DOING' | 'OVER_DUE' | 'COMPLETE'
}

export interface ServerResponse {
    data: IChore[]
}

const getTodoChores = filter<IChore>({status: 'TODO'})
const getCompleteChores = filter<IChore>({status: 'COMPLETE'})
const getDoingOrOverdueChores = filter<IChore>((chore: IChore) => {
    return !['TODO', 'COMPLETE'].includes(chore.status)
})

const Home: NextPage = () => {
    const [chores, setChores] = useState<Array<IChore>>([])
    const {get, loading, post, put, response} = useFetch('http://localhost:3000/api/chores')
    const addChore = useCallback(async (newChore: any) => post(newChore), [])
    const updateChore = useCallback(async (choreId: string, updatedChore: any) => put(`/${choreId}`, updatedChore), [])
    const getChores = useCallback(async () => get(), [])
    useEffect(() => {
        async function init() {
            const { data }: ServerResponse = await getChores()
            if(response.ok){
                setChores(data)
            }
        }
        init()
    }, [])

    if (loading) return <Text color={"purple.300"}>Loading....</Text>
    return (
        <React.Fragment>
            <Head>
                <title>Chores App</title>
                <meta name="description" content="Chore APP"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container minWidth={"5xl"}>
                <Heading as="h2" size="xl">
                    Chores App
                </Heading>
                <VStack
                    divider={<StackDivider borderColor="gray.200"/>}
                    spacing={4}
                    align="stretch"
                >
                    <Box border={"1px"} padding={"5px"}>
                        <AddChore onAdd={addChore}/>
                    </Box>
                    <Box bg="blue.100">
                        <Text fontSize={"large"} fontWeight="bold">
                            TO-DO
                        </Text>
                        <TodoChores chores={getTodoChores(chores)} updateChore={updateChore}/>
                    </Box>
                    <Box bg="red.50">
                        <Text fontSize={"large"} fontWeight="bold">
                            DOING
                        </Text>
                        <DoingChores chores={getDoingOrOverdueChores(chores)} updateChore={updateChore}/>
                    </Box>
                    <Box bg="green.100">
                        <Text fontSize={"large"} fontWeight="bold">
                            DONE
                        </Text>
                        <CompleteChores chores={getCompleteChores(chores)}/>
                    </Box>
                </VStack>

            </Container>
        </React.Fragment>
    );
};

export default Home;
