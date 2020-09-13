import React, { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Text,
  Flex,
  IconButton,
  Icon,
  Button,
  Collapse,
} from "@chakra-ui/core";
import UserSettings from "./UserSettings";

export interface UserProfileProps {
  username: string;
  avatar?: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, avatar }) => {
  const [isToggled, setToggle] = useState(false);
  return (
    <Box>
      <Stack isInline alignItems="center">
        <Text>{username}</Text>
        <Avatar name={username} src={avatar ? avatar : ""} />
        <IconButton
          icon={isToggled ? "chevron-up" : "chevron-down"}
          aria-label="open"
          variant="ghost"
          fontSize="24px"
          outline="none"
          onClick={() => {
            setToggle(!isToggled);
          }}
        />
      </Stack>
      <Collapse
        startingHeight={0}
        isOpen={isToggled}
        position="absolute"
        w="135px"
        duration="1s"
        zIndex="1"
      >
        <UserSettings />
      </Collapse>
    </Box>
  );
};

export default UserProfile;
