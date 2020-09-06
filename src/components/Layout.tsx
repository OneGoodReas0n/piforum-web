import React from "react";
import NavBar from "./NavBar";
import { Wrapper } from "./Wrapper";
import { LayoutProps } from "../interfaces/LayoutProps";

const Layout: React.FC<LayoutProps> = ({ variant, children, ...props }) => {
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
