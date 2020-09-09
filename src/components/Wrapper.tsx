import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";
import { LayoutProps } from "../interfaces/LayoutProps";

export const Wrapper: React.FC<LayoutProps & BoxProps> = ({
  children,
  variant = "big",
  ...props
}) => {
  return (
    <Box
      maxW={
        variant === "regular" ? "800px" : variant === "big" ? "1200px" : "400px"
      }
      w="100%"
      {...props}
    >
      {children}
    </Box>
  );
};
