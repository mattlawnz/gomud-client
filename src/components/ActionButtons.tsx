import { Button, Grid } from '@mui/material';
import React from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ServerResponse } from '../types';
import { CustomStyledItem } from './CustomStyledItem';

export const ActionButtons = () => {
  // const [openPracticeDialog, setOpenPracticeDialog] = useState(false);
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'exits';
    },
  });

  // const [exits, setExits] = useState<{ [direction: string]: string }>({});

  // This function will be called from Button elements to send commands to the server
  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  const handlePracticeButtonClick = () => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `practice`,
    };
    sendJsonMessage(messageForServer);
    // setOpenPracticeDialog(true);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Row for other actions */}
        <Grid item xs={12}>
          <CustomStyledItem>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('inventory')}>
              Inventory
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('equipment')}>
              Equipment
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('look')}>
              Look
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('score')}>
              Score
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('save')}>
              Save
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={() => sendCommand('recall')}>
              RECALL
            </Button>
            <Button variant="contained" sx={{ width: '100%' }} onClick={handlePracticeButtonClick}>
              Practice
            </Button>
          </CustomStyledItem>
        </Grid>
        {/* <Dialog open={openPracticeDialog} onClose={handleClosePracticeDialog} aria-labelledby="practice-dialog-title">
          <DialogTitle id="practice-dialog-title">Skill Tree</DialogTitle>
          <SkillTreeComponent />
        </Dialog> */}
      </Grid>
    </React.Fragment>
  );
};
