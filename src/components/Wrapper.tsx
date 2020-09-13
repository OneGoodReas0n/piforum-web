import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";
import { VariantProps } from "../interfaces/VariantProp";

export const Wrapper: React.FC<VariantProps & BoxProps> = ({
  variant,
  children,
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
