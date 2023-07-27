import { Box, Button, Typography } from '@mui/material';

import { useRoomData } from '../hooks/useRoomData';

export type MonsterEffectType = {
  name: string;
  adjective: string;
  description: string;
  type: number;
  duration: number;
  power: number;
  stacks: number;
  //affectedStat: {},
  msgOnApply: string;
  msgOnExpire: string;
  msgOnTick: string;
};

export type MonsterType = {
  monsterInstanceID: number;
  currentHealthPoints: number;
  currentManaPoints: number;
  monsterName: string;
  monsterDescription: string;
  monsterIcon: string;
  monsterEffects: MonsterEffectType[];
};

export type RoomType = {
  type: string;
  title: string;
  description: string;
  exits: {
    east?: string;
    west?: string;
    north?: string;
    south?: string;
  };
  itemNames: string[];
  monsterDescriptions: MonsterType[];
};

type RoomComponentProps = {
  roomData: RoomType;
};

export const RoomComponent = ({ roomData }: RoomComponentProps) => {
  if (!roomData || !roomData.type) {
    return (
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          No room data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography id="room-title" variant="h5" component="h2">
        {roomData.title}
      </Typography>
      <Typography id="room-description" variant="body1" component="p">
        {roomData.description}
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Listing Items
      </Typography>
      {/* prefer map here over for statement - this builds buttons for every item.*/}
      {roomData.itemNames.map((item, idx) => (
        //  each one needs to be unqiely indexed
        <div key={idx}>
          <Button variant="contained">{item}</Button>
          <br />
        </div>
      ))}
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Listing Monsters
      </Typography>
      {roomData.monsterDescriptions.map((monster, idx) => (
        <div key={idx}>
          <Button variant="contained">
            {monster.monsterName + ' (HP: ' + monster.currentHealthPoints + ', MP: ' + monster.currentManaPoints + ')'}
          </Button>
          <br />
        </div>
      ))}
    </Box>
  );
};

export const RoomView = () => {
  const roomData = useRoomData();
  return <RoomComponent roomData={roomData} />;
};
