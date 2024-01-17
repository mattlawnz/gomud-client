import { Avatar, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import type { MonsterDetail } from 'src/types';

import type { SecondaryView } from './Room';

type MonsterDetailProps = {
  //monsterId: number | null;
  // eslint-disable-next-line no-unused-vars
  // sendJsonMessage: (message: ClientCommand) => void;
  monsterDetailsData: MonsterDetail | null;
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};

export const MonsterDetailComponent = ({ monsterDetailsData: monsterDetail }: MonsterDetailProps) => {
  // const [monsterDetail, setMonsterDetail] = useState<MonsterDetail | null>(null);

  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
  //   share: true,
  //   filter(message: WebSocketEventMap['message']) {
  //     const serverResponse = JSON.parse(message.data) as ServerResponse;
  //     return serverResponse.type === 'monsterDetails';
  //   },
  // });

  // useEffect(() => {
  //   if (lastJsonMessage) {
  //     // Assert the type of lastJsonMessage to MonsterDetail
  //     const detail = lastJsonMessage as MonsterDetail;
  //     setMonsterDetail(detail);
  //   }
  // }, [lastJsonMessage]);

  // useEffect(() => {
  //   if (monsterId !== null) {
  //     const messageForServer: ClientCommand = {
  //       type: 'command',
  //       command: `mlook ${monsterId}`,
  //     };
  //     sendJsonMessage(messageForServer);
  //   }
  // }, [monsterId, sendJsonMessage]);

  if (!monsterDetail) {
    return <div>No monster details available.</div>;
  }

  let borderColor = 'transparent'; // Default
  if (monsterDetail.levelDiff <= 2) borderColor = 'green';
  else if (monsterDetail.levelDiff >= 3 && monsterDetail.levelDiff <= 5) borderColor = 'yellow';
  else if (monsterDetail.levelDiff >= 8) borderColor = 'red';

  // function renderListItems(equipment: string[], arg1: string): import('react').ReactNode {
  //   throw new Error('Function not implemented.');
  // }
  // Define a helper function to list items
  const renderListItems = (items: string[] | null, emptyText: string) => (
    <List dense>
      {items && items.length > 0 ? (
        items.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={item} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary={emptyText} />
        </ListItem>
      )}
    </List>
  );

  return (
    <Paper elevation={3} style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Avatar
            alt={monsterDetail.name}
            src={monsterDetail.icon ? `images/${monsterDetail.icon}` : ''}
            sx={{ width: 80, height: 80, border: `3px solid ${borderColor}` }}
          >
            {monsterDetail.icon ? null : monsterDetail.name.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" component="div" gutterBottom>
            {monsterDetail.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {monsterDetail.longDescription}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Health:</strong> {monsterDetail.health} | <strong>Level:</strong> {monsterDetail.level}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ margin: '20px 0' }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle2" gutterBottom>
            Currently Equipped
          </Typography>
          {renderListItems(monsterDetail.equipment, 'N/A')}
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" gutterBottom>
            Inventory
          </Typography>
          {renderListItems(monsterDetail.inventory, 'Nothing')}
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" gutterBottom>
            Effects
          </Typography>
          {renderListItems(monsterDetail.effects, 'None')}
        </Grid>
      </Grid>
    </Paper>
  );
};
