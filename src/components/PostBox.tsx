import React from "react";
import { Box, Link, Heading, Flex, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { Post } from "../generated/graphql";

interface PostBoxProps {
  post: Post;
  variant?: "listItem" | "post";
}

const PostBox: React.FC<PostBoxProps> = ({ post, variant = "listItem" }) => {
  if (variant === "listItem") {
    return (
      <Box>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>
        <Text mt={4} color="gray.600">
          {post.textSnippet}
        </Text>
        <Flex>
          <Text mt={2} color="gray.400" fontSize="14px">
            posted by {post.creator.username}
          </Text>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box>
        <Heading>{post.title}</Heading>
        <Text mt={4} color="gray.600" fontSize="20px">
          {post.text}
        </Text>
        <Flex>
          <Text mt={2} color="gray.400">
            posted by {post.creator.username}
          </Text>
        </Flex>
      </Box>
    );
  }
};

export default PostBox;
