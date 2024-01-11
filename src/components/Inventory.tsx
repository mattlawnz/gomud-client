import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Inventory, ItemDetails, ItemType, ServerResponse } from '../types';

type InventoryProps = {
  serverResponse: ServerResponse;
};

type ItemDetailsProps = {
  itemDetails: ItemDetails | null;
};

export const ItemDetailsComponent = ({ itemDetails }: ItemDetailsProps) => {
  // No need to fetch the details or use WebSocket in this component now
  // Just render the details using the itemDetails prop

  console.log(`ItemDetails: ${itemDetails}`);

  return <React.Fragment></React.Fragment>;
};

export const InventoryComponent = (props: InventoryProps) => {
  // This should be the state for storing the details of a single item
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  const [inventory, setInventory] = useState<Inventory | null>(null);

  // type ItemDetailsProps = {
  //   itemDetails: ItemDetails;
  //   // sendJsonMessage is probably not needed anymore if you're passing the details directly
  // };

  const inventoryMessage = props.serverResponse.message;
  //const [openLookDialog, setOpenLookDialog] = useState(false);
  // const [activeItemId, setActiveItemId] = useState<number | null>(null);

  try {
    let data: Inventory | null = null;
    data = JSON.parse(inventoryMessage) as Inventory;
    setInventory(data);
  } catch (err) {
    console.error('Error parsing inventory:', err);
  }
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerResponse>(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'itemDetails';
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

  // const handleLook = (item: ItemType) => {
  //   const messageForServer: ClientCommand = {
  //     type: 'command',
  //     command: `ilook ${item.itemInstanceID}`,
  //   };
  //   sendJsonMessage(messageForServer);
  // };

  const handleLook = (itemId: number) => {
    // setActiveItemId(itemId); // Set the active item ID
    // setOpenLookDialog(true); // Open the dialog
    // Send the command to the server
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `ilook ${itemId}`,
    };
    sendJsonMessage(messageForServer);
  };

  // Expandable Sections: If the secondary dialog contains additional information or options related to a selection in the primary dialog, consider using expandable sections or accordions within the dialog. This allows the user to see more information without leaving the context of the original dialog.

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const response = lastJsonMessage as unknown as ItemDetails; // Use type assertion
      if (response.type === 'itemDetails') {
        //setOpenLookDialog(true); // Open the dialog after setting the details
        setItemDetails(response); // Now you're setting the state correctly
      }
    }
  }, [lastJsonMessage]);

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
