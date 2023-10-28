import { Button, ButtonGroup } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, GroupInviteType, ServerResponse } from '../types';

type GroupInviteProps = {
  serverResponse: ServerResponse;
};

export const GroupInviteComponent = (props: GroupInviteProps) => {
  const groupInviteMessage = props.serverResponse.message;
  let groupInvite: GroupInviteType | null = null;

  try {
    groupInvite = JSON.parse(groupInviteMessage) as GroupInviteType;
  } catch (err) {
    console.error('Error parsing group invite:', err);
  }

  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'groupInvite';
    },
  });

  const handleAccept = () => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `acceptInvite ${groupInvite?.From}`,
    };
    sendJsonMessage(messageForServer);
  };

  const handleReject = () => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `rejectInvite ${groupInvite?.From}`,
    };
    sendJsonMessage(messageForServer);
  };

  return (
    <div style={{ border: '2px solid blue', margin: '10px', padding: '10px' }}>
      <h2>You have received a group invite from {groupInvite?.FromName}</h2>
      <ButtonGroup variant="text" color="primary">
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleReject}>Decline</Button>
      </ButtonGroup>
    </div>
  );
};
