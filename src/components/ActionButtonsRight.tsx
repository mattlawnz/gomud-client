import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ExitsResponse, ServerResponse } from '../types';
//import { CustomStyledItem } from './CustomStyledItem';

export const ActionButtonsRight = () => {
  // const [openPracticeDialog, setOpenPracticeDialog] = useState(false);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'exits';
    },
  });

  const [exits, setExits] = useState<{ [direction: string]: string }>({});

  // This function will be called from Button elements to send commands to the server
  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const exitsResponse = lastJsonMessage as ExitsResponse;
      setExits(exitsResponse.exits);
    }
  }, [lastJsonMessage]);

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Row for North */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={() => sendCommand('go north')} disabled={!exits['north']}>
            North
          </Button>
        </Grid>

        {/* Row for West and East */}
        <Grid item container xs={12} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={() => sendCommand('go west')} disabled={!exits['west']}>
              West
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => sendCommand('go east')} disabled={!exits['east']}>
              East
            </Button>
          </Grid>
        </Grid>

        {/* Row for Up and Down */}
        <Grid item container xs={12} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={() => sendCommand('go up')} disabled={!exits['up']}>
              Up
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => sendCommand('go down')} disabled={!exits['down']}>
              Down
            </Button>
          </Grid>
        </Grid>

        {/* Row for South */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={() => sendCommand('go south')} disabled={!exits['south']}>
            South
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
