import React from "react";
import {
  Box,
  Text,
  Stack,
  Avatar,
  Divider,
  Link,
  Button,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "../generated/graphql";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  return (
    <Box textAlign="center" bg="white" shadow="md" mt={-2} rounded="md">
      <Box p={3}>
        <NextLink href="/me/settings">
          <Link>
            <Text>Settings</Text>
          </Link>
        </NextLink>
        <Divider borderColor="gray.300" />
        <NextLink href="/faq">
          <Link>
            <Text>Help</Text>
          </Link>
        </NextLink>
        <Divider borderColor="gray.300" />
        <Button
          color="tomato"
          onClick={() => {
            logout();
            apolloClient.resetStore();
          }}
          variant="link"
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserSettings;
