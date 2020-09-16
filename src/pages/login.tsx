import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { withApollo } from "../utils/withApollo";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Wrapper variant="small" mx="auto" mt={8}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data.login.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
              console.log("---Cache: ", cache);
            },
          });
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

export default withApollo({ ssr: false })(Login);
