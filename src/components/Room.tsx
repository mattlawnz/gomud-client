import { Box, Grid, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import { useRoomData } from '../hooks/useRoomData';
import type { ClientCommand, RoomType } from '../types';
import { Characters } from './CharacterList';
import { Consumables } from './Consumables';
import { FightsList } from './Fights';
import { ItemList } from './ItemList';
import { MonsterList } from './MonsterList';
import { PromptOutput } from './PromptOutput';
import { QuestList } from './QuestList';

export type RoomComponentProps = {
  roomData: RoomType;
  sendCommand: (_command: string) => void;
};

export const RoomComponent = ({ roomData }: RoomComponentProps) => {
  if (!roomData || !roomData.type) {
    return (
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          No room data available
        </Typography>
      </Box>
    );
  }

  const backgroundImage = roomData.icon ? `url(images/${roomData.icon})` : 'none';

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '20px',
        width: '100%',
        minHeight: '100vh',
        display: 'flex', // Use flex layout to give more control over the child elements
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'space-between',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        },
      }}
    >
      {/* This container will hold the prompt output and the room description side by side */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <PromptOutput />
        <div style={{ flex: 1, paddingLeft: '20px' }}>
          {' '}
          {/* Add some space between the components */}
          <Typography id="room-title" variant="h6" component="h4" align="left" color="white">
            {roomData.title}
          </Typography>
          <Typography id="room-description" variant="body1" component="p" align="left" color="white">
            {roomData.description}
          </Typography>
        </div>
      </div>

      {/* The rest of your code remains unchanged */}
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <MonsterList />
          <Characters />
          <FightsList />
          <QuestList />
        </Grid>
        <Grid item xs={5}>
          <ItemList />
          <Consumables />
        </Grid>
      </Grid>

      <div style={{ flexGrow: 1 }}></div>
    </Box>
  );
};

export const RoomView = () => {
  const roomData = useRoomData();
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
  });

  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  return <RoomComponent roomData={roomData} sendCommand={sendCommand} />;
};
