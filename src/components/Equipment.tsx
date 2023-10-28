import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Equipment, EquipmentSlot, ServerResponse } from '../types';

type EquipmentProps = {
  serverResponse: ServerResponse;
};

export const EquipmentComponent = (props: EquipmentProps) => {
  const equipmentMessage = props.serverResponse.message;
  let equipment: Equipment | null = null;
  try {
    equipment = JSON.parse(equipmentMessage) as Equipment;
  } catch (err) {
    console.error('Error parsing equipment:', err);
  }
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'equipment';
    },
  });

  const handleUnequip = (item: EquipmentSlot) => {
    // Logic to unequip the item
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `iremove ${item.itemInstanceID}`, // Make sure itemID is the correct identifier
    };
    sendJsonMessage(messageForServer);
  };

  const weaponSlots = ['MainHand', 'OffHand'];
  const armorSlots = ['Head', 'Shoulders', 'Chest', 'Waist', 'Arms', 'Hands', 'Legs', 'Feet'];
  const jewelrySlots = ['Finger1', 'Finger2', 'Neck', 'Wrist1', 'Wrist2'];

  return (
    <Grid container spacing={3}>
      {/* Weapons on the left */}
      <Grid item xs={3}>
        <Typography variant="h6">Weapons</Typography>
        {equipment && equipment.equippedItems ? (
          equipment.equippedItems
            .filter((item) => weaponSlots.includes(item.slot))
            .map((item, index) => <EquipmentItem key={index} item={item} handleUnequip={handleUnequip} />)
        ) : (
          <div>No weapons found.</div>
        )}
      </Grid>

      {/* Armor in the middle */}
      <Grid item xs={4}>
        <Typography variant="h6">Armour</Typography>
        {equipment && equipment.equippedItems ? (
          equipment.equippedItems
            .filter((item) => armorSlots.includes(item.slot))
            .map((item, index) => <EquipmentItem key={index} item={item} handleUnequip={handleUnequip} />)
        ) : (
          <div>No armor found.</div>
        )}
      </Grid>

      {/* Jewelry on the right */}
      <Grid item xs={3}>
        <Typography variant="h6">Jewlery</Typography>
        {equipment && equipment.equippedItems ? (
          equipment.equippedItems
            .filter((item) => jewelrySlots.includes(item.slot))
            .map((item, index) => <EquipmentItem key={index} item={item} handleUnequip={handleUnequip} />)
        ) : (
          <div>No jewelry found.</div>
        )}
      </Grid>
    </Grid>
  );
};

type EquipmentItemProps = {
  item: EquipmentSlot;
  handleUnequip: (_item: EquipmentSlot) => void;
};

const EquipmentItem = ({ item, handleUnequip }: EquipmentItemProps) => {
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
            {showActions && <Button onClick={() => handleUnequip(item)}>Unequip</Button>}
          </>
        )}
      </ButtonGroup>
    </div>
  );
};
