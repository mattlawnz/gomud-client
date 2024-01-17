import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

import type { ItemDetails } from '../types';
import type { SecondaryView } from './Room';

type ItemDetailsProps = {
  // itemId: number | null;
  // // eslint-disable-next-line no-unused-vars
  // sendJsonMessage: (message: ClientCommand) => void;
  itemDetailsData: ItemDetails | null;
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};

export const ItemDetailsComponent = ({ itemDetailsData: itemDetails }: ItemDetailsProps) => {
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
