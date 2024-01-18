import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import { AuthStatus } from './AuthStatus';
import { ActionButtons } from './components/ActionButtons';
import { PromptOutput } from './components/PromptOutput';

export type LeftAppBarProps = {
  toggleFullScreen: () => void;
};

export const LeftAppBar = ({ toggleFullScreen }: LeftAppBarProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        width: isSmallScreen ? '100%' : 'auto', // Adjust width based on screen size
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Toolbar
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box sx={{ width: isSmallScreen ? '80px' : '100px', height: isSmallScreen ? '80px' : '100px' }}>
          <PromptOutput />
        </Box>
        <Box>
          <ActionButtons toggleFullScreen={toggleFullScreen} />
          <AuthStatus />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
