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
    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', xl: '1.5rem' },
    padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px', xl: '16px 30px' },
    margin: '4px', // Added a margin for some spacing between the buttons
    minWidth: '20px', // Ensuring a minimum touch target size
    borderRadius: '15px',
    '@media (max-height: 700px)': {
      padding: '4px 20px !important',
    },
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
        position: 'absolute',
        bottom: 0,
        padding: '8px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '20px',
        zIndex: 10,
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
