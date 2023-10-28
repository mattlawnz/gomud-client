import { Avatar, Box, IconButton, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Prompt, PromptResponse } from '../types';
import { GroupMembers } from './GroupMembers';
import { Portrait } from './Portrait';

type CircularProgressWithLabelProps = {
  value: number;
};

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} size={100} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar variant="circular" sx={{ width: '80%', height: '80%' }}>
          <Portrait />
        </Avatar>
        <Typography variant="caption" component="div" color="text.secondary" sx={{ position: 'absolute', bottom: 5 }}>
          {`${Math.round(props.value)}%`}
        </Typography>
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
    <Box display="flex" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgressWithLabel value={healthPercentage} />
        <GroupMembers />
      </Box>
      <Box ml={2}>
        <IconButton onClick={handleIconClick}>
          <img src="icons/health.png" alt="Health Icon" style={{ width: '24px', height: '24px' }} />
        </IconButton>
        <Typography variant="body2" align="center">
          {currentPrompt.DrustCurrentAmount}
        </Typography>
      </Box>
    </Box>
  );
};
