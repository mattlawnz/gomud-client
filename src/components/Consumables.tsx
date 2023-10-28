import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

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
            <Button onClick={() => setActiveItemId(activeItemId === idx ? null : idx)}>
              {item.consumableName === 'Drust' && (
                <img
                  src="icons/health.png"
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
                <Button onClick={() => handleGet(item)}>Get</Button>
              </>
            )}
          </ButtonGroup>
        ))}
    </div>
  );
};
