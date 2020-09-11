import { Box, Flex, Spinner } from "@chakra-ui/core";
import React from "react";

interface SpinnerProps {}

const CustomSpinner: React.FC<SpinnerProps> = ({}) => {
  return (
    <Box bg="">
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          w="60px"
          h="60px"
        />
      </Flex>
    </Box>
  );
};

export default CustomSpinner;
