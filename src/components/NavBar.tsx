import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MeQuery } from "../generated/graphql";
import UserProfile from "./UserProfile";
import { Wrapper } from "./Wrapper";

interface NavBarProps {
  meData: MeQuery;
  meLoading: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ meData, meLoading }) => {
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
        <UserProfile
          username={meData.me.username}
          avatarLink={meData.me.avatar?.publicLink}
          meLoading={meLoading}
        />
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
