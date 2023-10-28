import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, MonstersInRoomResponse, MonsterType, ServerResponse } from '../types';

export const MonsterList = () => {
  const [activeMonsterId, setActiveMonsterId] = useState<number | null>(null);
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'monstersinroom';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const monstersInRoomResponse = lastJsonMessage as MonstersInRoomResponse;
      setMonsters(monstersInRoomResponse.monsterDescriptions);
    }
  }, [lastJsonMessage]);

  //log the last message from the server
  useEffect(() => {
    if (lastJsonMessage) {
      // console.log('received message from server: ', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <div style={{ textAlign: 'left' }}>
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
                <Button
                  onClick={() => {
                    const messageForServer: ClientCommand = {
                      type: 'command',
                      command: `mlook ${monster.monsterInstanceID}`,
                    };
                    sendJsonMessage(messageForServer);
                    setActiveMonsterId(null); // Hide the additional buttons after clicking
                  }}
                >
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
    </div>
  );
};
