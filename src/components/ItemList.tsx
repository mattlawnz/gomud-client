import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ItemsInRoomResponse, ItemType, ServerResponse } from '../types';

export const ItemList = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'itemsinroom';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const itemsInRoomResponse = lastJsonMessage as ItemsInRoomResponse;
      setItems(itemsInRoomResponse.itemNames);
    }
  }, [lastJsonMessage]);

  const handleLook = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `ilook ${item.itemInstanceID}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };

  const handleGet = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `iget ${item.itemInstanceID}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };

  const itemToChat = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `itemToChat ${item.itemInstanceID}`,
    };
    sendJsonMessage(messageForServer);
    setActiveItemId(null);
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
      {items &&
        items.map((item, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            size="small"
            orientation="vertical"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button
              onClick={() => setActiveItemId(activeItemId === item.itemInstanceID ? null : item.itemInstanceID)}
              style={{ color: item.itemColor ? item.itemColor : 'inherit' }} // Use the item's color if provided
            >
              {item.itemName}
            </Button>
            {activeItemId === item.itemInstanceID && (
              <>
                <Button
                  onClick={() => handleLook(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Look
                </Button>
                <Button
                  onClick={() => handleGet(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Get
                </Button>
                <Button
                  onClick={() => itemToChat(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
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
