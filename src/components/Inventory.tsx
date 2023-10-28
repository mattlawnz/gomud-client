import { Button, ButtonGroup } from '@mui/material';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Inventory, ItemType, ServerResponse } from '../types';

type InventoryProps = {
  serverResponse: ServerResponse;
};

export const InventoryComponent = (props: InventoryProps) => {
  const inventoryMessage = props.serverResponse.message;
  let inventory: Inventory | null = null;
  try {
    inventory = JSON.parse(inventoryMessage) as Inventory;
  } catch (err) {
    console.error('Error parsing inventory:', err);
  }
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'inventory';
    },
  });

  const handleDrop = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `idrop ${item.itemInstanceID}`, // Make sure itemID is the correct identifier
    };
    sendJsonMessage(messageForServer);
  };

  const handleWear = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `iwear ${item.itemInstanceID}`, // Make sure itemID is the correct identifier
    };
    sendJsonMessage(messageForServer);
  };

  const handleLook = (item: ItemType) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `ilook ${item.itemInstanceID}`,
    };
    sendJsonMessage(messageForServer);
  };

  return (
    <div>
      {inventory && inventory.items ? (
        inventory.items.map((item) => (
          <div key={item.itemInstanceID}>
            {' '}
            {/* Use the correct unique key */}
            <ButtonGroup variant="text" color="primary">
              <Button
                style={{ color: item.itemColor ? item.itemColor : 'inherit' }} // Use the item's color if provided
              >
                {item.itemName}
              </Button>{' '}
              {/* Display item name */}
              <Button onClick={() => handleWear(item)}>Wear</Button>
              <Button onClick={() => handleLook(item)}>Look</Button>
              <Button onClick={() => handleDrop(item)}>Drop</Button>
            </ButtonGroup>
          </div>
        ))
      ) : (
        <div>No inventory items found.</div>
      )}
    </div>
  );
};
