import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import healthIcon from '../assets/icons/health.png';
import { getSocketURL } from '../config';
import type { ClientCommand, ConsumablesInRoomResponse, ConsumableType, ServerResponse } from '../types';

export const Consumables = () => {
  const [items, setItems] = useState<ConsumableType[]>([]);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'consumables';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const consumablesInRoomResponse = lastJsonMessage as ConsumablesInRoomResponse;
      setItems(consumablesInRoomResponse.consumables);
    }
  }, [lastJsonMessage]);

  const handleGet = (item: ConsumableType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `get ${item.consumableName}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {items &&
        items.map((item, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            size="small"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button
              onClick={() => setActiveItemId(activeItemId === idx ? null : idx)}
              sx={{
                '@media (min-width: 1440px)': {
                  fontSize: '26px !important',
                },
                '@media (min-width: 1996px)': {
                  fontSize: '30px !important',
                },
              }}
            >
              {item.consumableName === 'Drust' && (
                <img
                  src={healthIcon}
                  alt="Health Icon"
                  style={{
                    marginRight: '8px',
                    maxHeight: '1.5em', // Here you can set this to the height that you want
                    width: 'auto',
                  }}
                />
              )}
              {item.consumableName}
            </Button>

            {activeItemId === idx && (
              <>
                <Button
                  onClick={() => handleGet(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '26px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Get
                </Button>
              </>
            )}
          </ButtonGroup>
        ))}
    </div>
  );
};
