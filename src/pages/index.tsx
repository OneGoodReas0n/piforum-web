import { Box, Button, Flex, Spinner, Stack, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ManagePostButtons from "../components/ManagePostButtons";
import PostBox from "../components/PostBox";
import CustomSpinner from "../components/Spinner";
import VoteSection from "../components/VoteSection";
import { Post, useMeQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import PostComponent from "../components/PostComponent";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { data: meData, loading: meDataLoading } = useMeQuery();
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (meDataLoading || loading) {
    return <CustomSpinner />;
  } else if (!loading && !data) {
    return (
      <Box>
        <Text>You don't have data for some reason</Text>
      </Box>
    );
  }

  return (
    <Layout variant="big" mt={8} mx="auto" meData={meData}>
      {!data ? (
        <Box>Loading...</Box>
      ) : (
        <Stack mb={8}>
          {data.posts.posts.map((p: Post) =>
            !p ? null : <PostComponent meData={meData} post={p} key={p.id} />
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            m="auto"
            mb={8}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
