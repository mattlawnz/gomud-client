import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Tooltip } from '@mui/material';

export const Settings = () => {
  return (
    <Tooltip title="Settings">
      <IconButton aria-label="settings">
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Settings;
