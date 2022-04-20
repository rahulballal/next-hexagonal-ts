import {
  Box,
  Container,
  Heading,
  StackDivider,
  VStack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AddChore } from "../components/add-chore";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Chores App</title>
        <meta name="description" content="Chore APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container minWidth={"5xl"}>
        <Heading as="h2" size="xl">
          Chores App
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box border={"1px"} padding={"5px"}>
            <AddChore />
          </Box>
          <Box h="40px" bg="blue.100">
            <Text fontSize={"large"} fontWeight="bold">
              TO-DO
            </Text>
          </Box>
          <Box h="40px" bg="red.50">
            <Text fontSize={"large"} fontWeight="bold">
              DOING
            </Text>
          </Box>
          <Box h="40px" bg="green.100">
            <Text fontSize={"large"} fontWeight="bold">
              DONE
            </Text>
          </Box>
        </VStack>
      </Container>
    </React.Fragment>
  );
};

export default Home;
