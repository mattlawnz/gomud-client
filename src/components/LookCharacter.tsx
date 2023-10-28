import { Avatar, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import type { EquipmentSlot, LookCharacterType, ServerResponse } from '../types';

type LookCharacterProps = {
  serverResponse: ServerResponse;
};

export const LookCharacterComponent = (props: LookCharacterProps) => {
  const lookCharacterMessage = props.serverResponse.message;
  let lookCharacter: LookCharacterType | null = null;
  try {
    lookCharacter = JSON.parse(lookCharacterMessage) as LookCharacterType;
  } catch (err) {
    console.error('Error parsing look character:', err);
  }

  //style={{ width: 80, height: 80, border: `3px solid ${borderColor}` }}
  //         variant="circular"
  return (
    <Grid container spacing={3}>
      {/* Profile Information */}
      <Grid container item xs={12} alignItems="center">
        <Avatar alt="Character Portrait" src={lookCharacter?.portrait} sx={{ width: 150, height: 150 }} />

        <div style={{ marginLeft: '10px' }}>
          <Typography variant="h4">{lookCharacter?.name}</Typography>
          <Typography variant="body1">Level: {lookCharacter?.level}</Typography>
          <Typography variant="body1">
            Health: {lookCharacter?.health}/{lookCharacter?.maxHealth}
          </Typography>
        </div>
      </Grid>

      {/* Equipped Items */}
      <Grid item xs={12}>
        <Typography variant="h6">Equipped Items</Typography>
        {lookCharacter && lookCharacter.equippedItems ? (
          lookCharacter.equippedItems.map((item, index) => <EquipmentItem key={index} item={item} />)
        ) : (
          <div>No equipped items found.</div>
        )}
      </Grid>
    </Grid>
  );
};

type EquipmentItemProps = {
  item: EquipmentSlot;
};

const EquipmentItem = ({ item }: EquipmentItemProps) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div>
      <ButtonGroup variant="text" color="primary">
        {item.empty ? (
          <Button style={{ color: 'gray' }}>{item.slot} (Empty)</Button>
        ) : (
          <>
            <Button onClick={() => setShowActions(!showActions)}>
              {item.itemName} ({item.slot})
            </Button>
          </>
        )}
      </ButtonGroup>
    </div>
  );
};
