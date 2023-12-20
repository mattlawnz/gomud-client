// GroupMembers.tsx
import { Avatar, Badge, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { GroupUpdateType, ServerResponse } from '../types';

export const GroupMembers = () => {
  const [groupData, setGroupData] = useState<GroupUpdateType | null>(null);

  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'groupUpdate';
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const parsedData = JSON.parse((lastJsonMessage as ServerResponse).message) as GroupUpdateType;
      setGroupData(parsedData);
    }
  }, [lastJsonMessage]);

  if (!groupData) return null;

  const LeaderBadge = ({ children }: { children: React.ReactNode }) => (
    <Badge
      badgeContent="L"
      color="secondary"
      sx={{ '.MuiBadge-badge': { fontSize: '1.2em', width: '20px', height: '20px' } }}
    >
      {children}
    </Badge>
  );

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Show the leader if not the client */}
        {groupData.clientUUID !== groupData.leaderUUID && (
          <Box mb={2}>
            <LeaderBadge>
              <Avatar
                src={groupData.leaderPortrait}
                alt={`${groupData.leaderName}'s portrait`}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </LeaderBadge>
            <Typography variant="body2">{`${groupData.leaderName} (Leader)`}</Typography>
          </Box>
        )}

        {/* Show the other members */}
        {groupData.members.map((member) => {
          if (member.UUID !== groupData.clientUUID) {
            return (
              <Box key={member.UUID} mb={2}>
                <Avatar src={member.portrait} alt={`${member.name}'s portrait`} sx={{ width: 80, height: 80 }} />
                <Typography variant="body2">{member.name}</Typography>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </Box>
  );
};
