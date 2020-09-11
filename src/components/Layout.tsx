import React from "react";
import NavBar from "./NavBar";
import { Wrapper } from "./Wrapper";
import { BoxProps } from "@chakra-ui/core";
import { MeQuery } from "../generated/graphql";
import { VariantProps } from "../interfaces/VariantProp";

interface LayoutProps extends VariantProps {
  meData: MeQuery;
}

const Layout: React.FC<LayoutProps & BoxProps> = ({
  meData,
  variant,
  children,
  ...props
}) => {
  return (
    <>
      <NavBar meData={meData} />
      <Wrapper variant={variant} {...props}>
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
