import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ExitsResponse, ServerResponse } from '../types';

export const ActionButtonsRight = () => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'exits';
    },
  });

  const [exits, setExits] = useState<{ [direction: string]: string }>({});

  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  const buttonStyle = {
    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
    padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' },
    margin: '4px', // Added a margin for some spacing between the buttons
    minWidth: '64px', // Ensuring a minimum touch target size
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const exitsResponse = lastJsonMessage as ExitsResponse;
      setExits(exitsResponse.exits);
    }
  }, [lastJsonMessage]);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: '10px',
        transform: 'translateX(-50%)',
        zIndex: 1300,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} container justifyContent="center">
          <Button sx={buttonStyle} variant="contained" onClick={() => sendCommand('go up')} disabled={!exits['up']}>
            Up
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button sx={buttonStyle} variant="contained" onClick={() => sendCommand('go west')} disabled={!exits['west']}>
            W
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go north')}
            disabled={!exits['north']}
          >
            N
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button sx={buttonStyle} variant="contained" onClick={() => sendCommand('go east')} disabled={!exits['east']}>
            E
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go south')}
            disabled={!exits['south']}
          >
            S
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button sx={buttonStyle} variant="contained" onClick={() => sendCommand('go down')} disabled={!exits['down']}>
            Down
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
