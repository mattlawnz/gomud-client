import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Button,
  ButtonGroup,
  CardContent,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Inventory, ItemDetails, ItemType, ServerResponse } from '../types';

type ItemDetailsProps = {
  itemDetails: ItemDetails | null;
};

export const ItemDetailsComponent = ({ itemDetails }: ItemDetailsProps) => {
  const theme = useTheme();
  if (itemDetails === null) {
    return <React.Fragment></React.Fragment>;
  }
  const renderList = (items: string[], title: string) => (
    <div>
      <Typography variant="subtitle1">{title}</Typography>
      <List dense>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Typography variant="body2">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderModifiers = (modifiers: { [key: string]: number }, title: string) => (
    <div>
      <Typography variant="subtitle1">{title}</Typography>
      <List dense>
        {Object.entries(modifiers).map(([key, value], index) => (
          <ListItem key={index}>
            <Typography variant="body2">{`${key}: ${value}`}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: itemDetails.color, marginBottom: theme.spacing(1) }}>
          {itemDetails.name}
        </Typography>
        <Typography sx={{ marginBottom: theme.spacing(0.5) }} color="text.secondary">
          {itemDetails.description}
        </Typography>
        {itemDetails.armorDetails && <Typography variant="body2">Armor: {itemDetails.armorDetails}</Typography>}
        {itemDetails.weaponDetails && <Typography variant="body2">Weapon: {itemDetails.weaponDetails}</Typography>}
        {/* {itemDetails.category && <Typography variant="body2">Category: {itemDetails.category}</Typography>} */}
        {itemDetails.durability && (
          <Typography variant="body2">
            Durability: {itemDetails.durability.current}/{itemDetails.durability.max}
          </Typography>
        )}
        {itemDetails.level && <Typography variant="body2">Level: {itemDetails.level}</Typography>}
        <Typography variant="body2">Rarity: {itemDetails.rarity}</Typography>
        <Typography variant="body2">Score: {itemDetails.score}</Typography>
        {/* {itemDetails.wearSlots && <Typography variant="body2">Worn On: {itemDetails.wearSlots.join(', ')}</Typography>} */}
        {/* Lists at the bottom */}
        {itemDetails.materials && renderList(itemDetails.materials, 'Materials')}
        {itemDetails.attributeModifiers && renderModifiers(itemDetails.attributeModifiers, 'Attribute Modifiers')}
        {itemDetails.statModifiers && renderModifiers(itemDetails.statModifiers, 'Stat Modifiers')}
      </CardContent>
    </React.Fragment>
  );
};

type InventoryProps = {
  sendCommand: (_command: string) => void;
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
  const [showDetails, setShowDetails] = useState(false);

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
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false); // Close the inventory dialog
  };

  if (showDetails) {
    return (
      <React.Fragment>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDetails} aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            Back to list
          </Toolbar>
        </AppBar>
        <ItemDetailsComponent itemDetails={itemDetails} />
      </React.Fragment>
    );
  }

  // by default, return the list of items in inventory
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
    </React.Fragment>
  );
};
