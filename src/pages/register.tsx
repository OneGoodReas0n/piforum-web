import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper variant="small" mx="auto" mt={8}>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables:{ options: values }});
          if (response.data?.register.errors) {
            setErrors(errorMap(response.data.register.errors));
          } else {
            console.log("Registered !");
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                placeholder="Username"
                label="Username"
                name="username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                placeholder="Email"
                label="Email"
                name="email"
                type="email"
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
            <Flex mt={8} justifyContent="space-between">
              <Button type="button" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ssr: false})(Register);
