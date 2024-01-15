import { Box, Button, Grid } from '@mui/material';

import type { SecondaryView } from './Room';

export type ActionButtonsRightProps = {
  exitsData: { [direction: string]: string };
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};

export const ActionButtonsRight = ({ exitsData, sendCommand }: ActionButtonsRightProps) => {
  const buttonStyle = {
    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem', xl: '1.5rem' },
    padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px', xl: '16px 30px' },
    margin: '4px', // Added a margin for some spacing between the buttons
    minWidth: '20px', // Ensuring a minimum touch target size
    borderRadius: '15px',
    '@media (max-height: 700px)': {
      padding: '4px 20px !important',
    },
  };

  // make sure to fall back to an empty object if no exit data is available
  const exits = exitsData ? exitsData : {};

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        padding: '8px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '20px',
        zIndex: 10,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go up', null)}
            disabled={!exits['up']}
          >
            Up
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go west', null)}
            disabled={!exits['west']}
          >
            W
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go north', null)}
            disabled={!exits['north']}
          >
            N
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go east', null)}
            disabled={!exits['east']}
          >
            E
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go south', null)}
            disabled={!exits['south']}
          >
            S
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => sendCommand('go down', null)}
            disabled={!exits['down']}
          >
            Down
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
