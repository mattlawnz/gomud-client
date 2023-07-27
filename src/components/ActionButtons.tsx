import { Button, Grid } from '@mui/material';
import React from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand } from '../types';
import { CustomStyledItem } from './CustomStyledItem';

// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const ActionButtons = () => {
  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
  });

  // This function will be called from Button elements to send commands to the server
  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <CustomStyledItem>
          <Button variant="contained" onClick={() => sendCommand('go north')}>
            North
          </Button>
          <Button variant="contained" onClick={() => sendCommand('go south')}>
            South
          </Button>
          <Button variant="contained" onClick={() => sendCommand('go east')}>
            East
          </Button>
          <Button variant="contained" onClick={() => sendCommand('go west')}>
            West
          </Button>
        </CustomStyledItem>
      </Grid>
      <Grid item xs={12}>
        <CustomStyledItem>
          <Button variant="contained" onClick={() => sendCommand('inventory')}>
            Inventory
          </Button>
          <Button variant="contained" onClick={() => sendCommand('equipment')}>
            Equipment
          </Button>
          <Button variant="contained" onClick={() => sendCommand('look')}>
            Look
          </Button>
          <Button variant="contained" onClick={() => sendCommand('score')}>
            Score
          </Button>
          <Button variant="contained" onClick={() => sendCommand('save')}>
            Save
          </Button>
        </CustomStyledItem>
      </Grid>
    </React.Fragment>
  );
};
