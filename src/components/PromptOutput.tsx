import { Avatar, Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import healthIcon from '../assets/icons/health.png';
import { getSocketURL } from '../config';
import type { ClientCommand, Prompt, PromptResponse } from '../types';
import { GroupMembers } from './GroupMembers';
import { Portrait } from './Portrait';

type LinearProgressWithLabelProps = {
  value: number;
};

function LinearProgressWithLabel(props: LinearProgressWithLabelProps) {
  return (
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const PromptOutput = () => {
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as PromptResponse;
      return serverResponse.type === 'prompt';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const promptResponse = lastJsonMessage as PromptResponse;
      const parsedPrompt = JSON.parse(promptResponse.message) as Prompt;
      setCurrentPrompt(parsedPrompt);
    }
  }, [lastJsonMessage]);

  if (!currentPrompt) {
    return null;
  }

  const healthPercentage = (currentPrompt.Health / currentPrompt.MaxHealth) * 100;

  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };

  const handleIconClick = () => {
    sendCommand('consumedrust');
  };

  return (
    <Box
      id="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Ensure the items are spaced out full width
        marginBottom: '5px',
        padding: '0', // Make sure there's no padding reducing the inner width
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%', padding: '0' }}>
        <Avatar variant="rounded" sx={{ width: 60, height: 60, marginBottom: 1 }}>
          <Portrait />
        </Avatar>
        {/* Adjust the width of LinearProgressWithLabel container */}
        <Box sx={{ width: '100%', padding: '0' }}>
          <LinearProgressWithLabel value={healthPercentage} />
        </Box>
        <GroupMembers />
      </Box>
      <Box>
        <IconButton
          onClick={handleIconClick}
          sx={{
            padding: '4px',
            width: '32px',
            height: '32px',
            '@media (max-width: 768px)': {
              width: '24px',
              height: '24px',
            },
          }}
        >
          <img src={healthIcon} alt="Health Icon" style={{ width: '100%', height: '100%' }} />
        </IconButton>
        <Typography variant="body2" align="center" color="white">
          {currentPrompt.DrustCurrentAmount}
        </Typography>
      </Box>
    </Box>
  );
};
