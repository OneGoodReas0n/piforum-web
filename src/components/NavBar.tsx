import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Wrapper } from "./Wrapper";

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = () => {
  const [{ fetching, data }] = useMeQuery({ pause: isServer() });
  const [, logout] = useLogoutMutation();
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
  );;

  if (!fetching && data?.me) {
    body = (
      <Flex>
        <Box mr={2}>{data?.me.username}</Box>{" "}
        <Button
          onClick={() => {
            logout();
            router.push("/");
          }}
          variant="link"
        >
          Log out
        </Button>
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
