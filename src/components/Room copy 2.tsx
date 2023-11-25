import { Box, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import { useRoomData } from '../hooks/useRoomData';
import type { ClientCommand, RoomType } from '../types';
import { Characters } from './CharacterList';
import { ItemList } from './ItemList';
import { MonsterList } from './MonsterList';

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
        minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
        display: 'flex', // Use flex layout to give more control over the child elements
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'space-between', // This will distribute space evenly and push the footer to the bottom
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
          zIndex: -1, // Ensure the overlay is behind the content
        },
      }}
    >
      <Typography
        id="room-title"
        variant="h6"
        component="h4"
        align="left"
        color="white" // Set text color to white for readability
      >
        {roomData.title}
      </Typography>
      <Typography
        id="room-description"
        variant="body1"
        component="p"
        align="left"
        color="white" // Set text color to white for readability
      >
        {roomData.description}
      </Typography>

      {/* <Grid container spacing={3}>
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
      </Grid> */}

      {/* New Grid layout for monsters, items, and players */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 2 }}>
        {/* Monster List */}
        <Box sx={{ margin: '0 10px' }}>
          <MonsterList monsters={roomData.monsters} />
        </Box>

        {/* Character List */}
        <Box sx={{ margin: '0 10px' }}>
          <Characters characters={roomData.characters} />
        </Box>

        {/* Item List */}
        <Box sx={{ margin: '0 10px' }}>
          <ItemList items={roomData.items} />
        </Box>
      </Box>

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
