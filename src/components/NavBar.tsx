import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Wrapper } from "./Wrapper";
import { useApolloClient } from "@apollo/client";
import UserProfile from "./UserProfile";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { loading, data } = useMeQuery({ skip: isServer() });
  const router = useRouter();
  let body = (
    <>
      <NextLink href="/login">
        <Link mr={2}>Log in</Link>
      </NextLink>
      <NextLink href="/register">
        <Link mr={2}>Register</Link>
      </NextLink>
    </>
  );

  if (!loading && data?.me) {
    body = (
      <Flex>
        <UserProfile username={data.me.username} />
      </Flex>
    );
  }
  return (
    <Box p={4} bg="blue.200">
      <Wrapper variant="big" mx="auto">
        <Flex alignItems="center" justifyContent="space-between">
          <NextLink href="/">
            <Link>
              <Heading>Piforum</Heading>
            </Link>
          </NextLink>
          <Flex alignItems="center">
            <Button
              bg="blue.400"
              color="white"
              onClick={() => router.push("/create-post")}
            >
              create post
            </Button>
            <Box ml={8}>{body}</Box>
          </Flex>
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default NavBar;
