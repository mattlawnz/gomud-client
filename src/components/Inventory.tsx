import { Button, ButtonGroup, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Inventory, ItemDetails, ItemType, ServerResponse } from '../types';

type InventoryProps = {
  sendCommand: (_command: string) => void;
};

type ItemDetailsProps = {
  itemDetails: ItemDetails | null;
};

export const ItemDetailsComponent = ({ itemDetails }: ItemDetailsProps) => {
  if (itemDetails === null) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {itemDetails.itemID}
        </Typography>
        <Typography variant="h5" component="div">
          {itemDetails.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {itemDetails.description}
        </Typography>
        <Typography variant="body2">{itemDetails.type}</Typography>
      </CardContent>
    </React.Fragment>
  );
};

export const InventoryComponent = ({ sendCommand }: InventoryProps) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerResponse>(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'inventory' || serverResponse.type === 'itemDetails';
    },
  });

  // Disable the eslint warning for the dependency array here as we only want to run this once
  // when the component is first mounted so dependencies need to be empty array []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => sendCommand('inventory'), []);

  // This should be the state for storing the details of a single item
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [inventory, setInventory] = useState<Inventory>({} as Inventory);

  // Expandable Sections: If the secondary dialog contains additional information or options related to a selection in the primary dialog, consider using expandable sections or accordions within the dialog. This allows the user to see more information without leaving the context of the original dialog.

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.type === 'inventory') {
        const data = JSON.parse(lastJsonMessage.message) as Inventory;
        setInventory(data); // Now you're setting the state correctly
      } else if (lastJsonMessage.type === 'itemDetails') {
        const response = lastJsonMessage as unknown as ItemDetails; // Use type assertion
        setItemDetails(response); // Now you're setting the state correctly
      }
    }
  }, [lastJsonMessage]);

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

  const handleLook = (itemId: number) => {
    // Send the command to the server
    console.log(`Looking at item ${itemId}`);
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `ilook ${itemId}`,
    };
    sendJsonMessage(messageForServer);
  };

  return (
    <React.Fragment>
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
              <Button onClick={() => handleLook(item.itemInstanceID)}>Look</Button>
              <Button onClick={() => handleDrop(item)}>Drop</Button>
            </ButtonGroup>
          </div>
        ))
      ) : (
        <div>No inventory items found.</div>
      )}
      {/* <Dialog open={openLookDialog} onClose={() => setOpenLookDialog(false)}>
        <DialogTitle id="look-dialog-title">Item Details</DialogTitle> */}
      <ItemDetailsComponent itemDetails={itemDetails} />
      {/* </Dialog> */}
    </React.Fragment>
  );
};
