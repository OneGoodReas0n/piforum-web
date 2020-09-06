import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  useIsAuth();

  return (
    <Layout variant="regular" mx="auto" mt={8}>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField placeholder="Title" label="Title" name="title" />
            </Box>
            <Box mt={4}>
              <InputField
                placeholder="Text"
                label="Text"
                name="text"
                variant="textarea"
              />
            </Box>
            <Box mt={4}>
              <Flex>
                <Button
                  type="button"
                  variantColor="gray"
                  mr="auto"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variantColor="teal"
                  isLoading={isSubmitting}
                  ml="auto"
                >
                  Create a Post
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
