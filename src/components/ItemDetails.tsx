import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ItemDetails, ServerResponse } from '../types';

type ItemDetailsProps = {
  itemId: number | null;
  // eslint-disable-next-line no-unused-vars
  sendJsonMessage: (message: ClientCommand) => void;
};

export const ItemDetailsComponent = ({ itemId }: ItemDetailsProps) => {
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'itemDetails';
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const detail = lastJsonMessage as ItemDetails;
      setItemDetails(detail);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (itemId !== null) {
      const messageForServer: ClientCommand = {
        type: 'command',
        command: `ilook ${itemId}`,
      };
      sendJsonMessage(messageForServer);
    }
  }, [itemId, sendJsonMessage]);

  if (!itemDetails) {
    return <Typography>No item details available.</Typography>;
  }

  const formatAttribute = (value: number) => (value >= 0 ? `+${value}` : `${value}`);

  return (
    <Paper style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
      {/* <Typography variant="h6" gutterBottom>
        Item Details
      </Typography> */}
      {/* <Divider style={{ marginBottom: '10px' }} /> */}
      <Typography>{itemDetails.description}</Typography>
      {itemDetails.weaponDetails && <Typography>Weapon Details: {itemDetails.weaponDetails}</Typography>}
      {itemDetails.level && <Typography>Level: {itemDetails.level}</Typography>}
      {itemDetails.materials && itemDetails.materials.length > 0 && (
        <Typography>Materials: {itemDetails.materials.join(', ')}</Typography>
      )}
      {itemDetails.rarity && <Typography style={{ color: itemDetails.color }}>Rarity: {itemDetails.rarity}</Typography>}
      {itemDetails.score !== undefined && <Typography>Score: {itemDetails.score}</Typography>}
      <Typography variant="subtitle1">Attributes:</Typography>
      {itemDetails.attributeModifiers && (
        <List dense>
          {Object.entries(itemDetails.attributeModifiers).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={`${key}: ${formatAttribute(value)}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
