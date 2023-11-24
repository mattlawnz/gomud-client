// RightAppBar.tsx
import MapIcon from '@mui/icons-material/Map';
import { Box, IconButton } from '@mui/material';
import type React from 'react';

interface RightAppBarProps {
  handleRightModalToggle: () => void;
}

export const RightAppBar: React.FC<RightAppBarProps> = ({ handleRightModalToggle }) => {
  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="open map"
        edge="end"
        onClick={handleRightModalToggle}
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <MapIcon />
      </IconButton>
    </Box>
  );
};
