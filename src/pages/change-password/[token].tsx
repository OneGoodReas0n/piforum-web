import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { errorMap } from "../../utils/errorMap";
import { withApollo } from "../../utils/withApollo";

const ChangePassword: React.FC<{}> = ({}) => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { newPassword, confirmPassword } = values;
          if (newPassword.length <= 2) {
            setErrors({
              newPassword: "New Password should be greater than 2 symbols",
            });
          } else if (confirmPassword.length <= 2) {
            setErrors({
              confirmPassword:
                "Confirm Password should be greater than 2 symbols",
            });
          } else if (newPassword !== confirmPassword) {
            setErrors({
              confirmPassword: "Passwords should be equal",
            });
          }
          const response = await changePassword( {variables:{
            token:
              typeof router.query.token === "string" ? router.query.token : "",
            password: newPassword,
          }});
          if (response.data.changePassword.errors) {
            if (
              response.data.changePassword.errors[0].field.includes("token")
            ) {
              console.log(response.data.changePassword.errors[0].message);
              setTokenError(response.data.changePassword.errors[0].message);
            }
            setErrors(errorMap(response.data.changePassword.errors));
          } else if (response.data.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                placeholder="Password"
                label="New password"
                name="newPassword"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                placeholder="Password"
                label="Confirm password"
                name="confirmPassword"
                type="password"
              />
            </Box>
            {tokenError && (
              <Box mt={4} color="red.600">
                <Flex>
                  {tokenError}
                  <NextLink href="/forgot-password">
                    {" "}
                    click here to get a new one
                  </NextLink>
                </Flex>
              </Box>
            )}
            <Box mt={4}>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Change password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ssr: false})(ChangePassword);
