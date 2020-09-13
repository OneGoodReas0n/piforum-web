import React from "react";
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";

interface Page404Props {}

const Page404: React.FC<Page404Props> = ({}) => {
  const router = useRouter();
  return (
    <Box w="100%">
      <Flex
        h="100vh"
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Icon name="warning-2" fontSize="60px" alignSelf="center" />
        <Box mt={2}>
          <Heading textAlign="center" fontSize="48px">
            Error 404
          </Heading>
        </Box>
        <Box textAlign="center">
          <Text fontSize="30px" mt={2}>
            Page not found!
          </Text>
        </Box>
        <Flex justifyContent="center">
          <Button
            bg="teal.400"
            mt={8}
            color="grey.500"
            onClick={() => {
              router.push("/");
            }}
          >
            Back to main page
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page404;
