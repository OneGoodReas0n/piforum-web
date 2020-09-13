import { Box, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import ManagePostButtons from "../../components/ManagePostButtons";
import Page404 from "../../components/Page404";
import PostBox from "../../components/PostBox";
import CustomSpinner from "../../components/Spinner";
import { Post, useMeQuery, usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface Props {}

const PostPage: React.FC<Props> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { loading, data, error } = usePostQuery({
    skip: intId === -1,
    variables: {
      postId: intId,
    },
  });

  if (loading || meLoading) {
    return <CustomSpinner />;
  } else if (!loading && data?.post) {
    return (
      <Layout variant="regular" mx="auto" mt={8} meData={meData}>
        <Flex justifyContent="space-between">
          <PostBox variant="post" post={data.post as Post} />
          <ManagePostButtons id={data.post.id} variant="post" />
        </Flex>
      </Layout>
    );
  } else if (error) {
    return (
      <Layout meData={meData}>
        <Box>{error}</Box>
      </Layout>
    );
  } else if (!data?.post) {
    return (
      <Layout variant="regular" mx="auto" mt={8} meData={meData}>
        <Page404 />
      </Layout>
    );
  }
};

export default withApollo({ ssr: true })(PostPage);
