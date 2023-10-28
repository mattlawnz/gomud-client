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

  // useEffect(() => {
  //   if (lastJsonMessage !== null) {
  //     const exitsResponse = lastJsonMessage as ExitsResponse;
  //     setExits(exitsResponse.exits);
  //   }
  // }, [lastJsonMessage]);

  const handlePracticeButtonClick = () => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `practice`,
    };
    sendJsonMessage(messageForServer);
    // setOpenPracticeDialog(true);
  };

  // const handleClosePracticeDialog = () => {
  //   setOpenPracticeDialog(false);
  // };

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Row for North */}
        {/* <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={() => sendCommand('go north')} disabled={!exits['north']}>
            North
          </Button>
        </Grid> */}

        {/* Row for West and East
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
        </Grid> */}

        {/* Row for Up and Down
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
        </Grid> */}

        {/* Row for South
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={() => sendCommand('go south')} disabled={!exits['south']}>
            South
          </Button>
        </Grid> */}

        {/* Row for other actions */}
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
            <Button variant="contained" onClick={() => sendCommand('recall')}>
              RECALL
            </Button>
            <Button variant="contained" onClick={handlePracticeButtonClick}>
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
