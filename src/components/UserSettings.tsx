import { useApolloClient } from "@apollo/client";
import { Box, Button, Divider, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  return (
    <Box textAlign="center" bg="white" shadow="md" mt={-2} rounded="md">
      <Box p={3}>
        <NextLink href="/me/profile">
          <Link>
            <Text>My profile</Text>
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
            apolloClient.cache.evict({ fieldName: "me" });
            router.push("/");
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
