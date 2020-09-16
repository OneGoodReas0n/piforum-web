import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import DropzoneField from "../../components/DropzoneField";
import { InputField } from "../../components/InputField";
import Layout from "../../components/Layout";
import CustomSpinner from "../../components/Spinner";
import {
  useMeQuery,
  useUpdateUserMutation,
  deleteMe,
  useDeleteMeMutation,
} from "../../generated/graphql";
import FileWithPreview from "../../interfaces/FileWithPreview";
import { withApollo } from "../../utils/withApollo";

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteMe, { loading: deleteMeLoading }] = useDeleteMeMutation();
  if (loading) {
    return <CustomSpinner />;
  } else {
    return (
      <Box>
        <Layout
          variant="regular"
          mt={8}
          mx="auto"
          meData={data}
          mb={8}
          meLoading={loading}
        >
          <Heading>My Profile</Heading>
          <Formik
            initialValues={{
              email: data.me?.email,
              username: data.me?.username,
              bio: "",
              photo: null as FileWithPreview,
            }}
            onSubmit={async (values, { setErrors }) => {
              let publicLink = "";
              if (values.photo) {
                const formData = new FormData();
                formData.append("file", values.photo);
                formData.append(
                  "upload_preset",
                  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                );
                const response = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                  {
                    body: formData,
                    method: "POST",
                  }
                );
                const data = await response.json();
                publicLink = data.secure_url;
              }

              updateUser({
                variables: {
                  username: values.username,
                  bio: values.bio,
                  publicLink: publicLink ? publicLink : "",
                },
                update: (cache) => {
                  cache.evict({ fieldName: "me" });
                },
              });
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Box my={4}>
                  <Text fontWeight="bold">Photo</Text>
                  {data.me.avatar?.publicLink ? (
                    <Avatar
                      w="80px"
                      h="80px"
                      name={data.me.username}
                      src={data.me.avatar.publicLink}
                    />
                  ) : (
                    <DropzoneField setField={setFieldValue} name="photo" />
                  )}
                </Box>
                <Box>
                  <FormControl mt={4}>
                    <InputField
                      label="Email"
                      name="email"
                      isDisabled={true}
                      aria-describedby="email-helper-text"
                    />
                    <FormHelperText id="email-helper-text">
                      We'll never share your email.
                    </FormHelperText>
                  </FormControl>
                  <FormControl mt={4}>
                    <InputField label="Username" name="username" />
                  </FormControl>
                  <FormControl mt={4}>
                    <InputField label="Bio" name="bio" variant="text-area" />
                  </FormControl>
                  <Box mt={4}>
                    <FormLabel>Danger Area</FormLabel>
                    <Box border="1px solid tomato" borderRadius="5px" mt={2}>
                      <Flex
                        p="20px"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Text fontWeight={600}>Delete your account</Text>
                          <Text fontSize="14px">
                            There is no possibility to restore your accout after
                            deleting
                          </Text>
                        </Box>

                        <Button
                          color="tomato"
                          border="0.25px solid gray"
                          bg="#F2F2F2"
                          onClick={async () => {
                            await deleteMe();
                            router.push("/");
                          }}
                          isLoading={deleteMeLoading}
                        >
                          Delete Me
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
                <Flex>
                  <Button
                    mt={16}
                    ml="auto"
                    type="submit"
                    variantColor="teal"
                    isLoading={isSubmitting}
                  >
                    Save Settings
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Layout>
      </Box>
    );
  }
};

export default withApollo({ ssr: false })(Profile);
