import { Box, Flex } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import PostBox from "../../components/PostBox";
import { Post, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ManagePostButtons from "../../components/ManagePostButtons";

interface Props {}

const PostPage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ fetching, data, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      postId: intId,
    },
  });

  if (fetching) {
    return <div>Loading...</div>;
  } else if (!fetching && data?.post) {
    return (
      <Layout variant="regular" mx="auto" mt={8}>
        <Flex justifyContent="space-between">
          <PostBox variant="post" post={data.post as Post} />
          <ManagePostButtons id={data.post.id} variant="post" />
        </Flex>
      </Layout>
    );
  } else if (error) {
    return (
      <Layout>
        <Box>{error}</Box>
      </Layout>
    );
  } else if (!data?.post) {
    return (
      <Layout>
        <Box>Error, post not found !</Box>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient)(PostPage);
