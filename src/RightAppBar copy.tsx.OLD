import { AppBar, Box, Toolbar } from '@mui/material';
import type React from 'react';

import { ActionButtonsRight } from './components/ActionButtonsRight';
import { MiniMap } from './components/MiniMap';

export const RightAppBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex', flex: 1 }}>
        <Box sx={{ width: '100px', height: '100px' }}></Box>
        <Box sx={{ flex: '1 1 auto', width: '100%', display: 'flex' }}>
          {/* Make sure your map component has a classname 'map' and styles are defined accordingly */}
          <div className="map">
            <MiniMap />
          </div>
        </Box>
        <Box>
          <ActionButtonsRight />
        </Box>
        {/* Additional components can be added here */}
      </Toolbar>
    </AppBar>
  );
};
