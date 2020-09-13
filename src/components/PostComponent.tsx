import React from "react";
import { Stack, Box, Flex } from "@chakra-ui/core";
import VoteSection from "./VoteSection";
import PostBox from "./PostBox";
import ManagePostButtons from "./ManagePostButtons";
import { MeQuery, Post } from "../generated/graphql";

export interface PostComponentProps {
  meData: MeQuery;
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ meData, post }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" key={post.id}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex>
          <Box mr={8}>
            <VoteSection post={post} />
          </Box>
          <PostBox post={post} />
        </Flex>
        {meData.me?.id === post.creatorId && <ManagePostButtons id={post.id} />}
      </Flex>
    </Box>
  );
};

export default PostComponent;
