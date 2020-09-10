import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import Layout from "../../components/Layout";
import { usePostQuery, useUpdatePostMutation } from "../../generated/graphql";
import { errorMap } from "../../utils/errorMap";

interface updatePostProps {}

const updatePost: React.FC<updatePostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [updatePost] = useUpdatePostMutation();
  const { data, loading } = usePostQuery({
    skip: postId === -1,
    variables: {
      postId,
    },
  });
  if (!loading && data) {
    return (
      <Layout variant="regular" mx="auto" mt={8}>
        <Formik
          initialValues={{ title: data?.post.title, text: data?.post.text }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await updatePost({variables:{
              id: postId,
              text: values.text,
              title: values.title,
            }});
            if (data.updatePost.errors) {
              setErrors(errorMap(data.updatePost.errors));
            } else if (data.updatePost.post) {
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
                    Save post
                  </Button>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  } else {
    return (
      <Layout variant="regular" mx="auto" mt={8}>
        <Box>Loading</Box>
      </Layout>
    );
  }
};

export default withApollo({ssr: false})(updatePost);
