import { Flex, Text } from "@chakra-ui/core";
import React from "react";
import { Post } from "../generated/graphql";
import VoteButton from "./VoteButton";

interface VoteSectionProps {
  post: Post;
}

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <VoteButton post={post} variant="up" />
      <Text>{post.points}</Text>
      <VoteButton post={post} variant="down" />
    </Flex>
  );
};

export default VoteSection;
