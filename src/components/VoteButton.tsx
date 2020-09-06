import React, { useState } from "react";
import { Button, Icon } from "@chakra-ui/core";
import { Post, useVoteMutation, useMeQuery } from "../generated/graphql";
import Router from "next/router";

interface VoteButtonProps {
  post: Post;
  variant: "up" | "down";
}

const VoteButton: React.FC<VoteButtonProps> = ({ post, variant }) => {
  const [, vote] = useVoteMutation();
  const [{ data }] = useMeQuery();
  const [voteLoadingState, setVoteLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const iconName = variant === "up" ? "chevron-up" : "chevron-down";
  return (
    <Button
      backgroundColor={
        post.voteStatus > 0 && variant === "up"
          ? "green.400"
          : post.voteStatus < 0 && variant === "down"
          ? "red.500"
          : ""
      }
      color={
        (post.voteStatus > 0 && variant === "up") ||
        (post.voteStatus < 0 && variant === "down")
          ? "white"
          : ""
      }
      onClick={async () => {
        setVoteLoadingState(
          variant === "up" ? "upvote-loading" : "downvote-loading"
        );
        await vote({ value: variant === "up" ? 1 : -1, postId: post.id });

        setVoteLoadingState("not-loading");
      }}
      isLoading={
        voteLoadingState ===
        (variant === "up" ? "upvote-loading" : "downvote-loading")
      }
    >
      <Icon
        name={iconName}
        size="24px"
        aria-label={variant === "up" ? "Upvote" : "Downvote"}
      />
    </Button>
  );
};

export default VoteButton;
