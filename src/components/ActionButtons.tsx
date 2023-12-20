import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ServerResponse } from '../types';
import { CustomStyledItem } from './CustomStyledItem';
import { SkillTreeComponent } from './SkillTree';

export const ActionButtons = () => {
  const [openPracticeDialog, setOpenPracticeDialog] = useState(false);
  const [serverResponse, setServerResponse] = useState<ServerResponse>();
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      setServerResponse(serverResponse);
      console.log('response', serverResponse);
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
    setOpenPracticeDialog(true);
  };
  const handleClosePracticeDialog = () => {
    setOpenPracticeDialog(false);
  };
  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Row for other actions */}
        <Grid item xs={12} sx={{ width: '100%' }}>
          <CustomStyledItem>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('inventory')}
            >
              Inventory
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('equipment')}
            >
              Equipment
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('look')}
            >
              Look
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('score')}
            >
              Score
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('save')}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={() => sendCommand('recall')}
            >
              RECALL
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
              onClick={handlePracticeButtonClick}
            >
              Practice
            </Button>
          </CustomStyledItem>
        </Grid>
        <Dialog open={openPracticeDialog} onClose={handleClosePracticeDialog} aria-labelledby="practice-dialog-title">
          <DialogTitle id="practice-dialog-title">Skill Tree</DialogTitle>
          {serverResponse && <SkillTreeComponent serverResponse={serverResponse} />}
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};
