import { Box, Grid, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import { useRoomData } from '../hooks/useRoomData';
import type { ClientCommand, RoomType } from '../types';
import { ActionButtonsRight } from './ActionButtonsRight';
import { Consumables } from './Consumables';
import Controller from './Controller';
import { ItemList } from './ItemList';
import { MonsterList } from './MonsterList';
import { PromptOutput } from './PromptOutput';

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
  const backgroundImage = roomData.icon ? `url(src/assets/images/${roomData.icon})` : 'none';

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '10px 20px',
        width: '100%',
        height: '100%',
        display: 'flex', // Use flex layout to give more control over the child elements
        // justifyContent: 'space-between',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        gap: '10px',
        overflow: 'hidden',
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
        '@media (max-width: 768px)': {
          padding: '10px',
        },
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          maxWidth: '74%',
          width: '74%',
          height: '85%',
          gap: '10px',
        }}
      >
        <Grid sx={{ maxWidth: '24%', width: '24%', height: '99%' }}>
          <PromptOutput />
          <Controller />
        </Grid>
        <Grid sx={{ maxWidth: '74%', width: '74%' }}>
          <div
            style={{
              padding: '10px',
              marginBottom: '5px',
              height: '85%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid white',
              overflow: 'auto',
            }}
          >
            {' '}
            <Typography
              id="room-title"
              variant="h6"
              component="h4"
              align="center"
              color="white"
              sx={{
                '@media (min-width: 1440px)': {
                  fontSize: '30px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '34px !important',
                },
              }}
            >
              {roomData.title}
            </Typography>
            <Typography
              id="room-description"
              variant="body1"
              component="p"
              align="left"
              color="white"
              sx={{
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
            >
              {roomData.description}
            </Typography>
          </div>
          <MonsterList />
        </Grid>
      </Grid>

      <Grid
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: '24%',
          width: '24%',
          height: '85%',
        }}
      >
        <Grid
          sx={{
            position: 'relative',
            padding: '8px',
            width: '100%',
            height: '49%',
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid white',
            transitionDuration: '0.3s',
            zIndex: '12',
            '@media (max-height: 700px)': {
              height: '25px',
              padding: 0,
              overflow: 'hidden',
              '&:hover': {
                width: '200%',
                height: '80%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'translateX(-50%)',
              },
            },
          }}
        >
          <Box
            color="white"
            textAlign="center"
            sx={{
              '@media (min-width: 1440px)': {
                fontSize: '26px !important',
              },
              '@media (min-width: 1996px)': {
                fontSize: '30px !important',
              },
            }}
          >
            Item List
          </Box>
          <ItemList />
          <Consumables />
        </Grid>
        <Grid
          sx={{
            position: 'absolute',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ActionButtonsRight />
        </Grid>
      </Grid>
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
