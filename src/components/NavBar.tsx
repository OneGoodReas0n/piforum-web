import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MeQuery, useLogoutMutation } from "../generated/graphql";
import { Wrapper } from "./Wrapper";
<<<<<<< HEAD
import { useApolloClient } from "@apollo/client";
import UserProfile from "./UserProfile";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { loading, data } = useMeQuery({ skip: isServer() });
=======

interface NavBarProps {
  meData: MeQuery;
}

const NavBar: React.FC<NavBarProps> = ({ meData }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
>>>>>>> 534bbdd901fc7a83f9bb4aa4f17b5ebd9c69e03d
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
  if (meData?.me) {
    body = (
      <Flex>
<<<<<<< HEAD
        <UserProfile username={data.me.username} />
=======
        <Box mr={2}>{meData?.me.username}</Box>{" "}
        <Button
          onClick={() => {
            logout();
            apolloClient.resetStore();
          }}
          variant="link"
          isLoading={logoutFetching}
        >
          Log out
        </Button>
>>>>>>> 534bbdd901fc7a83f9bb4aa4f17b5ebd9c69e03d
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
