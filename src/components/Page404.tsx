import React from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/core";

interface Page404Props {}

const Page404: React.FC<Page404Props> = ({}) => {
  return (
    <Box w="100%">
      <Flex h="100vh">
        <Icon name="warning-2" fontSize="50px" />
        <Heading textAlign="center">Error | 404</Heading>
        <Text fontSize="24px" mt={8}>
          Post not found!
        </Text>
      </Flex>
    </Box>
  );
};

export default Page404;
