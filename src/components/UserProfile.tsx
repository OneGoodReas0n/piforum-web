import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/core";
import React, { useRef, useState } from "react";
import { User } from "../generated/graphql";
import UserSettings from "./UserSettings";

export interface UserProfileProps {
  username: string;
  avatarLink: string | undefined;
  meLoading: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  avatarLink,
  meLoading,
}) => {
  const [isToggled, setToggle] = useState(false);
  const toggleBtn = useRef(null);
  if (!meLoading) {
    return (
      <Box>
        <Stack isInline alignItems="center">
          {avatarLink ? (
            <Avatar src={avatarLink} />
          ) : (
            <Avatar name={username} />
          )}

          <Text>{username}</Text>
          <IconButton
            icon={isToggled ? "chevron-up" : "chevron-down"}
            aria-label="open"
            variant="ghost"
            fontSize="24px"
            outline="none"
            ref={toggleBtn}
            onClick={(e) => {
              if (isToggled) {
                toggleBtn.current.blur();
              }
              setToggle(!isToggled);
            }}
            onBlur={() => {
              setTimeout(() => {
                setToggle(!isToggled);
              }, 50);
            }}
          />
        </Stack>
        <Collapse
          startingHeight={0}
          isOpen={isToggled}
          position="absolute"
          w="135px"
          duration={1}
          zIndex={1}
        >
          <UserSettings />
        </Collapse>
      </Box>
    );
  }
};

export default UserProfile;
