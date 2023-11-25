import { AppBar, Box, Toolbar } from '@mui/material';
import type React from 'react';

import { ActionButtons } from './components/ActionButtons';
import { PromptOutput } from './components/PromptOutput';

export const LeftAppBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <Box sx={{ width: '100px', height: '100px' }}>
          {/* You can adjust these values */}
          <PromptOutput />
        </Box>
        {/* Additional components can be added here */}
        <Box>
          <ActionButtons />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// export const LeftAppBar: React.FC = () => {
//   return (
//     <AppBar position="static" sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
//       <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
//         <Box sx={{ width: '100px', height: '100px' }}>
//           {' '}
//           {/* You can adjust these values */}
//           <PromptOutput />
//         </Box>
//         <Box>
//           <ActionButtons />
//         </Box>
//         {/* Additional components can be added here */}
//       </Toolbar>
//     </AppBar>
//   );
// };
