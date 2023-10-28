import { Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, FightsResponse, FightsType, ServerResponse } from '../types';

export const FightsList = () => {
  const [fights, setFights] = useState<FightsType[]>([]);
  const [activeFightId, setActiveFightId] = useState<string | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'fights';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const fightsResponse = lastJsonMessage as FightsResponse;
      setFights(fightsResponse.fights);
    }
  }, [lastJsonMessage]);

  const handleLook = (fight: FightsType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `fightlook ${fight.fightID}`,
    };
    sendJsonMessage(messageForServer);
    setActiveFightId(null);
  };

  const handleJoin = (fight: FightsType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `fightjoin ${fight.fightID}`,
    };
    sendJsonMessage(messageForServer);
    setActiveFightId(null);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {fights && fights.length > 0 && <Typography variant="h6">Current Fights</Typography>}
      {fights &&
        fights.map((fight, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            size="small"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button onClick={() => setActiveFightId(activeFightId === fight.fightID ? null : fight.fightID)}>
              {`${fight.participantsSide1.map((p) => p.name).join(', ')} vs ${fight.participantsSide2
                .map((p) => p.name)
                .join(', ')}`}
            </Button>
            {activeFightId === fight.fightID && (
              <>
                <Button onClick={() => handleLook(fight)}>Look</Button>
                <Button onClick={() => handleJoin(fight)}>Join</Button>
              </>
            )}
          </ButtonGroup>
        ))}
    </div>
  );
};
