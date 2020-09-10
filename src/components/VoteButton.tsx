import { Button, Icon } from "@chakra-ui/core";
import React, { useState } from "react";
import { Post, useVoteMutation, VoteMutation } from "../generated/graphql";
import { gql, ApolloCache } from "@apollo/client";

interface VoteButtonProps {
  post: Post;
  variant: "up" | "down";
}

const updateVoteAfter = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {
  const data = cache.readFragment<{id: number, poinst:number, voteStatus: number | null}>(
    {
      id: 'Post:' + postId,
      fragment: gql`
          fragment _ on Post {
            id
            points
            voteStatus
          }
        `,
    }
  )
    if(data){
      if(data.voteStatus === value){
        return;
      }
      const newPoints = (data.poinst as number) + (!data.voteStatus ? 1 : 2) * value;
      cache.writeFragment({
        id: 'Post:'+postId,
        fragment: gql`
            fragment __ on Post {
              points
              voteStatus
            }
        `,
        data: {points: newPoints, voteStatus:value} as any,
      })
    }
  }

const VoteButton: React.FC<VoteButtonProps> = ({ post, variant }) => {
  const [vote] = useVoteMutation();
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
        await vote({ variables: {value: variant === "up" ? 1 : -1, postId: post.id} , update: (cache)=> updateVoteAfter(variant === "up" ? 1 : -1, post.id, cache)});
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
