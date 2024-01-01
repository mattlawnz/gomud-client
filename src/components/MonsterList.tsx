import { Button, ButtonGroup, Dialog, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, MonsterDetail, MonstersInRoomResponse, MonsterType, ServerResponse } from '../types';
import { MonsterDetailComponent } from './MonsterDetails';

export const MonsterList = () => {
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);
  const [openLookDialog, setOpenLookDialog] = useState(false);
  const [activeMonsterId, setActiveMonsterId] = useState<number | null>(null);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    onMessage: (message) => {
      const response = JSON.parse(message.data) as ServerResponse;
      console.log('WebSocket message:', response); // Debugging log
      setServerResponse(response);

      if (response.type === 'monsterDetails') {
        setOpenLookDialog(true);
      }
    },
  });

  const handleLookButtonClick = (monsterId: number) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `mlook ${monsterId}`,
    };
    sendJsonMessage(messageForServer);
    setOpenLookDialog(true); // Open the dialog
  };

  useEffect(() => {
    console.log('Last JSON message:', lastJsonMessage); // Debugging log
    if (lastJsonMessage) {
      const monstersResponse = lastJsonMessage as MonstersInRoomResponse;
      console.log('Monsters in room:', monstersResponse.monsterDescriptions); // Debugging log
      setMonsters(monstersResponse.monsterDescriptions);
    }
  }, [lastJsonMessage]);

  //log the last message from the server
  useEffect(() => {
    if (lastJsonMessage) {
      // console.log('received message from server: ', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  let monsterDetail: MonsterDetail | null = null;
  if (serverResponse && serverResponse.type === 'monsterDetails') {
    try {
      monsterDetail = JSON.parse(serverResponse.message) as MonsterDetail;
    } catch (error) {
      console.error('Error parsing monster details:', error);
      monsterDetail = null;
    }
  }

  return (
    // <div style={{ height: '14%', textAlign: 'left', border: '1px solid white', background: 'rgba(0, 0, 0, 0.5)' }}>
    <div>
      {' '}
      {/* Apply left alignment here */}
      {monsters &&
        monsters.map((monster, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }} // Added display and marginBottom
          >
            <Button
              onClick={() =>
                setActiveMonsterId(activeMonsterId === monster.monsterInstanceID ? null : monster.monsterInstanceID)
              }
            >
              {monster.shortDescription + ' (HP: ' + monster.currentHealthPoints + ')'}
            </Button>
            {activeMonsterId === monster.monsterInstanceID && (
              <>
                <Button onClick={() => handleLookButtonClick(monster.monsterInstanceID)}>
                  {' '}
                  {/* Updated this line */}
                  Look
                </Button>
                <Button
                  onClick={() => {
                    const messageForServer: ClientCommand = {
                      type: 'command',
                      command: `mkill ${monster.monsterInstanceID}`,
                    };
                    sendJsonMessage(messageForServer);
                    setActiveMonsterId(null); // Hide the additional buttons after clicking
                  }}
                >
                  Attack
                </Button>
                <Button
                  onClick={() => {
                    const messageForServer: ClientCommand = {
                      type: 'command',
                      command: `monsterToChat ${monster.monsterInstanceID}`,
                    };
                    sendJsonMessage(messageForServer);
                    setActiveMonsterId(null); // Hide the additional buttons after clicking
                  }}
                >
                  Chat
                </Button>
              </>
            )}
          </ButtonGroup>
        ))}
      {/* Dialog for displaying monster details */}
      {/* Dialog for displaying monster details */}
      <Dialog open={openLookDialog} onClose={() => setOpenLookDialog(false)}>
        <DialogTitle id="look-dialog-title">Monster Details</DialogTitle>
        {monsterDetail && <MonsterDetailComponent monsterDetail={monsterDetail} />}
      </Dialog>
    </div>
  );
};
