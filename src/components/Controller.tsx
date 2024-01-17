/* eslint-disable prettier/prettier */
import { Grid } from '@mui/material';

import type { CharacterList } from '../types';
import { Characters } from './CharacterList';
import { FightsList } from './Fights';
import { QuestList } from './QuestList';
import type { SecondaryView } from './Room';

export type ControllerComponentProps = {
  playersData: CharacterList[];
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};

const Controller = ({ playersData, sendCommand }: ControllerComponentProps) => {
  return (
    <Grid
      spacing={3}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0',
        width: '100%',
        height: `calc(100% - 100px)`,
        gap: '10px',
        '@media (max-width: 768px)': {
          height: `calc(100% - 60px)`,
        },
      }}
    >
      <Grid
        sx={{
          padding: '8px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid white',
          overflow: 'auto',
          transitionDuration: '0.3s',
          '@media (max-width: 768px)': {
            padding: '2px',
          },
        }}
      >
        <Characters playersData={playersData} sendCommand={sendCommand} />
        <FightsList />
        <QuestList />
      </Grid>
    </Grid>
  );
};

export default Controller;
