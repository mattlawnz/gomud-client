import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { CharacterList, ClientCommand, ServerResponse } from '../types';

export const Characters = () => {
  const [players, setPlayers] = useState<CharacterList[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'playersinroom';
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const playersInRoom = lastJsonMessage as { players: CharacterList[] };
      setPlayers(playersInRoom.players);
    }
  }, [lastJsonMessage]);

  const handleLook = (player: CharacterList) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `characterlook ${player.uuid}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };

  // New function to handle the invite action
  const handleInvite = (player: CharacterList) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `invite ${player.uuid}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };
  return (
    <div style={{ textAlign: 'left' }}>
      {players && players.length > 0 && (
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            '@media (max-width: 768px)': {
              fontSize: '12px !important',
            },
            '@media (min-width: 1440px)': {
              fontSize: '24px !important',
            },
            '@media (min-width: 1996px)': {
              fontSize: '30px !important',
            },
          }}
        >
          Players in Room
        </Typography>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {players.map((player, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            size="small"
            sx={{
              margin: '5px 0',
            }}
          >
            <Button
              onClick={() => setActiveItemId(`player${idx}`)}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                '@media (max-width: 768px)': {
                  padding: 0,
                  fontSize: '10px !important',
                  letterSpacing: '-1.5px',
                },
                '@media (min-width: 1440px)': {
                  fontSize: '20px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '26px !important',
                },
              }}
            >
              {`Lvl ${player.level} - ${player.displayName}`}
              <ArrowDropDownIcon fontSize="small" />
            </Button>
            {activeItemId === `player${idx}` && (
              <div id={`player${idx}`}>
                <Button
                  onClick={() => handleLook(player)}
                  sx={{
                    '@media (max-width: 768px)': {
                      padding: 0,
                      fontSize: '10px !important',
                      letterSpacing: '-1.5px',
                    },
                    '@media (min-width: 1440px)': {
                      fontSize: '20px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '26px !important',
                    },
                  }}
                >
                  Look
                </Button>
                <Button
                  onClick={() => handleInvite(player)}
                  sx={{
                    '@media (max-width: 768px)': {
                      padding: 0,
                      fontSize: '10px !important',
                      letterSpacing: '-1.5px',
                    },
                    '@media (min-width: 1440px)': {
                      fontSize: '20px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '26px !important',
                    },
                  }}
                >
                  Invite
                </Button>{' '}
                {/* New Invite Button */}
              </div>
            )}
          </ButtonGroup>
        ))}
      </div>
    </div>
  );
};
