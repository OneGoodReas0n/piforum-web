import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useDeletePostMutation } from "../generated/graphql";

interface ManagePostButtonsProps {
  id: number;
  variant?: "listItem" | "post";
}

const ManagePostButtons: React.FC<ManagePostButtonsProps> = ({
  id,
  variant = "listItem",
}) => {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();
  return (
    <Flex flexDirection="column" alignItems="center">
      <IconButton
        aria-label="edit post"
        bg={variant === "post" ? "gray.200" : "gray.500"}
        color={variant === "post" ? "black" : "white"}
        borderRadius="10px"
        mb={4}
        icon="edit"
        fontSize={variant === "post" && "20px"}
        p={variant === "post" && 4}
        onClick={() => router.push(`/edit/${id}`)}
      />
      <IconButton
        aria-label="delete post"
        bg={variant === "post" ? "gray.200" : "red.500"}
        color={variant === "post" ? "black" : "white"}
        borderRadius="10px"
        mb={4}
        icon="delete"
        fontSize={variant === "post" && "20px"}
        p={variant === "post" && 4}
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Post:" + id });
            },
          });
        }}
      />
    </Flex>
  );
};

export default ManagePostButtons;
