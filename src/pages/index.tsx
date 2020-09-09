import { Box, Button, Flex, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ManagePostButtons from "../components/ManagePostButtons";
import PostBox from "../components/PostBox";
import VoteSection from "../components/VoteSection";
import {
  Post,
  useMeQuery,
  usePostsQuery
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
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
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
