import { Box, Button, Flex, Stack, Text } from "@chakra-ui/core";
import React from "react";
import Layout from "../components/Layout";
import ManagePostButtons from "../components/ManagePostButtons";
import PostBox from "../components/PostBox";
import VoteSection from "../components/VoteSection";
import {
  Post,
  useMeQuery,
  usePostsQuery,
  PostsQuery
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {

  const { data: meData} = useMeQuery();
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables:{
      limit:10,
      cursor: null
    },
    notifyOnNetworkStatusChange:true 
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
            !p ? null : (
              <Box p={5} shadow="md" borderWidth="1px" key={p.id}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex>
                    <Box mr={8}>
                      <VoteSection post={p} />
                    </Box>
                    <PostBox post={p} />
                  </Flex>
                  {meData.me?.id === p.creatorId && (
                    <ManagePostButtons id={p.id} />
                  )}
                </Flex>
              </Box>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            m="auto"
            mb={8}
            onClick={() => {
              fetchMore({variables:{
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
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

export default withApollo({ssr: true})(Index);
