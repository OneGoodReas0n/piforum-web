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
import { FilePond, registerPlugin } from "react-filepond";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import CustomSpinner from "../../components/Spinner";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [files, setFiles] = useState([]);
  if (loading) {
    return <CustomSpinner />;
  } else {
    return (
      <Box>
        <Layout variant="regular" mt={8} mx="auto" meData={data}>
          <Heading>My Profile</Heading>
          <Box my={4}>
            <Text fontWeight="bold">Photo</Text>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              server="/api"
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
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
