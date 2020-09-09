import React from "react";
import NavBar from "./NavBar";
import { Wrapper } from "./Wrapper";
import { LayoutProps } from "../interfaces/LayoutProps";
import { BoxProps } from "@chakra-ui/core";

const Layout: React.FC<LayoutProps & BoxProps> = ({ variant, children, ...props }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant} {...props}>
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
