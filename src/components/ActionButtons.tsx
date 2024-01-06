import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ServerResponse } from '../types';
import { ScoreComponent } from './CharacterScore';
import { CustomStyledItem } from './CustomStyledItem';
import { EquipmentComponent } from './Equipment';
import { InventoryComponent } from './Inventory';
import { SkillTreeComponent } from './SkillTree';

export const ActionButtons = () => {
  const [openPracticeDialog, setOpenPracticeDialog] = useState(false);
  const [openScoreDialog, setOpenScoreDialog] = useState(false); // New state for score dialog
  const [openEquipmentDialog, setOpenEquipmentDialog] = useState(false); // New state for equipment dialog
  const [openInventoryDialog, setOpenInventoryDialog] = useState(false); // New state for inventory dialog
  const [openRecallDialog, setOpenRecallDialog] = useState(false); // New state for recall dialog
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

  const handleScoreButtonClick = () => {
    sendCommand('score');
    setOpenScoreDialog(true); // Open the score dialog
  };
  const handleCloseScoreDialog = () => {
    setOpenScoreDialog(false); // Close the score dialog
  };

  const handleEquipmentButtonClick = () => {
    sendCommand('equipment');
    setOpenEquipmentDialog(true); // Open the equipment dialog
  };
  const handleCloseEquipmentDialog = () => {
    setOpenEquipmentDialog(false); // Close the equipment dialog
  };

  const handleInventoryButtonClick = () => {
    sendCommand('inventory');
    setOpenInventoryDialog(true); // Open the inventory dialog
  };
  const handleCloseInventoryDialog = () => {
    setOpenInventoryDialog(false); // Close the inventory dialog
  };

  const handleRecallButtonClick = () => {
    sendCommand('recall');
    setOpenRecallDialog(true); // Open the recall dialog
  };

  const handleCloseRecallDialog = () => {
    setOpenRecallDialog(false); // Close the recall dialog
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
              onClick={handleInventoryButtonClick}
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
              onClick={handleEquipmentButtonClick}
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
              // onClick={() => sendCommand('score')}
              onClick={handleScoreButtonClick} // Updated onClick handler for score button
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
              // onClick={() => sendCommand('recall')}
              onClick={handleRecallButtonClick}
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
        {/* Dialog for Score */}
        <Dialog open={openScoreDialog} onClose={handleCloseScoreDialog} aria-labelledby="score-dialog-title">
          <DialogTitle id="score-dialog-title">Score Information</DialogTitle>
          {serverResponse && serverResponse.type === 'score' && <ScoreComponent serverResponse={serverResponse} />}
        </Dialog>
        {/* Dialog for Equipment */}
        <Dialog
          open={openEquipmentDialog}
          onClose={handleCloseEquipmentDialog}
          aria-labelledby="equipment-dialog-title"
        >
          <DialogTitle id="equipment-dialog-title">Equipment Information</DialogTitle>
          {serverResponse && serverResponse.type === 'equipment' && (
            <EquipmentComponent serverResponse={serverResponse} />
          )}
        </Dialog>
        {/* Dialog for Inventory */}
        <Dialog
          open={openInventoryDialog}
          onClose={handleCloseInventoryDialog}
          aria-labelledby="inventory-dialog-title"
        >
          <DialogTitle id="inventory-dialog-title">Inventory Information</DialogTitle>
          {serverResponse && serverResponse.type === 'inventory' && (
            <InventoryComponent serverResponse={serverResponse} />
          )}
        </Dialog>
        {/* Dialog for Recall */}
        <Dialog open={openRecallDialog} onClose={handleCloseRecallDialog} aria-labelledby="recall-dialog-title">
          <DialogTitle id="recall-dialog-title">Recall</DialogTitle>
          <div style={{ padding: '20px' }}>You return to your starting position</div>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};
