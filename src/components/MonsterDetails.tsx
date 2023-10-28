import { Avatar, Divider, Grid, Typography } from '@mui/material';

import type { MonsterDetail, ServerResponse } from '../types';

type MonsterDetailProps = {
  serverResponse: ServerResponse;
};

export const MonsterDetailComponent = (props: MonsterDetailProps) => {
  const monsterDetail = props.serverResponse as unknown as MonsterDetail;

  if (!monsterDetail) {
    return null;
  }

  let borderColor = 'transparent'; // Default
  if (monsterDetail.levelDiff <= 2) borderColor = 'green';
  else if (monsterDetail.levelDiff >= 3 && monsterDetail.levelDiff <= 5) borderColor = 'yellow';
  else if (monsterDetail.levelDiff >= 8) borderColor = 'red';

  return (
    <div style={{ textAlign: 'left', position: 'relative' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={1}>
          <Avatar
            alt={monsterDetail.name}
            src={monsterDetail.icon ? `images/${monsterDetail.icon}` : ''}
            style={{ width: 80, height: 80, border: `3px solid ${borderColor}` }}
            variant="circular"
          >
            {monsterDetail.icon ? null : monsterDetail.name.charAt(0)} {/* Show first letter if no icon */}
          </Avatar>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h4">{monsterDetail.name}</Typography>
          <Typography variant="body1">{monsterDetail.longDescription}</Typography>
          <Typography variant="h6">
            <strong>Health:</strong> {monsterDetail.health} | <strong>Level:</strong> {monsterDetail.level}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {/* Equipment on the left */}
        <Grid item xs={4}>
          <Typography variant="h6">Currently Equipped</Typography>
          {monsterDetail.equipment?.length > 0
            ? monsterDetail.equipment.map((item, idx) => <div key={idx}>{item}</div>)
            : 'N/A'}
        </Grid>

        {/* Inventory on the right */}
        <Grid item xs={4}>
          <Typography variant="h6">Inventory</Typography>
          {monsterDetail.inventory?.length > 0
            ? monsterDetail.inventory.map((item, idx) => <div key={idx}>{item}</div>)
            : 'Nothing'}
        </Grid>

        {/* Effects if needed */}
        <Grid item xs={4}>
          <Typography variant="h6">Effects</Typography>
          {monsterDetail.effects?.length > 0
            ? monsterDetail.effects.map((effect, idx) => <div key={idx}>{effect}</div>)
            : 'None'}
        </Grid>
      </Grid>
      <Divider style={{ margin: '20px 0' }} /> {/* Adding the divider here */}
    </div>
  );
};
