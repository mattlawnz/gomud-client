import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
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

export const RoomComponent = ({ roomData, sendCommand }: RoomComponentProps) => {
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
    // The outermost box, with the background image and overall styling
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
      {/* The main grid, containing the prompt output, controller, and monster list */}
      <Grid
        sx={{
          display: 'flex',
          maxWidth: '74%',
          width: '74%',
          height: '85%',
          gap: '10px',
        }}
      >
        {/* The left grid, containing the prompt output and controller */}
        <Grid sx={{ maxWidth: '24%', width: '24%', height: '99%' }}>
          <PromptOutput />
          <Controller />
        </Grid>

        {/* The middle grid, containing the room title, description, and item list */}
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
                  fontSize: '18px !important',
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
                  fontSize: '18px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '34px !important',
                },
              }}
            >
              {roomData.description}
            </Typography>
          </div>
          {/* The right grid, now including the monsterListStyle */}
          <Grid>
            {/* ... [previous code for this section] */}
            <div
              style={{
                minHeight: '14%', // Ensure it always takes at least 14% of the height
                maxHeight: '14%', // Prevent it from taking more than 14%
                overflowY: 'auto', // Enable scrolling for overflow
                textAlign: 'left',
                border: '1px solid white',
                background: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* <MonsterList /> */}
              <ItemList />
              <Consumables />
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/* The rightmost grid, containing the item list, consumables, and action buttons */}
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
        {/* The top grid, containing the item list and consumables */}
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
            Monsters:
          </Box>
          <MonsterList />
          {/* <ItemList />
          <Consumables /> */}
        </Grid>
        {/* The bottom grid, containing the action buttons */}
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
      <DummyLookCommandComponent sendCommand={sendCommand} />;
    </Box>
  );
};

// The RoomView component fetches the room data and handles sending commands
export const RoomView = () => {
  // Fetch the room data
  const roomData = useRoomData();
  // Establish a WebSocket connection
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
  });

  // Function to send a command to the server
  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  // Render the RoomComponent with the fetched room data and sendCommand function
  return <RoomComponent roomData={roomData} sendCommand={sendCommand} />;
};

export type DummyLookCommandComponentProps = {
  sendCommand: (_command: string) => void;
};
/**
 * This is a dummy component to call the `look` command again. The issue is that sometimes the components
 * take time to load and we have already received the data e.g. `monstersinroom` via the websocket. This just
 * makes another call to `look` command to get room data and update. Note that this is only really needed
 * during the load of first room. It could be that it may be needed when we switch to `fight` view and then
 * back to `room` view.
 */
export const DummyLookCommandComponent = ({ sendCommand }: DummyLookCommandComponentProps) => {
  // Disable the eslint warning for the dependency array here as we only want to run this once
  // when the component is first mounted so dependencies need to be empty array []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => sendCommand('look'), []);

  return <React.Fragment></React.Fragment>;
};
