import { Box, Button, Flex, Stack, Text } from "@chakra-ui/core";
import React from "react";
import Layout from "../components/Layout";
import ManagePostButtons from "../components/ManagePostButtons";
import PostBox from "../components/PostBox";
import VoteSection from "../components/VoteSection";
import { Post, useMeQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import PostComponent from "../components/PostComponent";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <Box>
        <Text>You don't have data for some reason</Text>
      </Box>
    );
  }

  return (
    <Layout variant="big" mt={8} mx="auto">
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
