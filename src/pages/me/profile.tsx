import React, { useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
} from "@chakra-ui/core";
import { withApollo } from "../../utils/withApollo";
import Layout from "../../components/Layout";
import CustomSpinner from "../../components/Spinner";
import DropzoneField from "../../components/DropzoneField";

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [file, setFile] = useState(null);
  if (loading) {
    return <CustomSpinner />;
  } else {
    return (
      <Box>
        <Layout variant="regular" mt={8} mx="auto" meData={data}>
          <Heading>My Profile</Heading>
          <Box my={4}>
            <Text fontWeight="bold">Photo</Text>
            <DropzoneField setFile={setFile} />
          </Box>
          <Box>
            <FormControl mt={4}>
              <FormLabel htmlFor="email" fontWeight="bold">
                Email
              </FormLabel>
              <Input
                type="email"
                id="email"
                aria-describedby="email-helper-text"
                isDisabled={true}
                value={data.me?.email}
              />
              <FormHelperText id="email-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="username" fontWeight="bold">
                Username
              </FormLabel>
              <Input type="username" id="username" value={data.me?.username} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="bio" fontWeight="bold">
                Bio
              </FormLabel>
              <Textarea type="bio" id="bio" value={data.me?.username} />
            </FormControl>
          </Box>
        </Layout>
      </Box>
    );
  }
};

export default withApollo({ ssr: false })(Profile);
