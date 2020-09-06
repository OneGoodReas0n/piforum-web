import React from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { errorMap } from "../utils/errorMap";
import { Box, Button, Link, Flex } from "@chakra-ui/core";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small" mx="auto" mt={8}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data.login.errors) {
            setErrors(errorMap(response.data.login.errors));
          } else if (response.data.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next || "/");
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                placeholder="Username or Email"
                label="Username or Email"
                name="usernameOrEmail"
              />
            </Box>
            <Box mt={4}>
              <InputField
                placeholder="Password"
                label="Password"
                name="password"
                type="password"
              />
            </Box>
            <Flex mt={4} color="blue.400">
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot password?</Link>
              </NextLink>
            </Flex>
            <Flex mt={8} justifyContent="space-between">
              <Button type="button" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Log in
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
