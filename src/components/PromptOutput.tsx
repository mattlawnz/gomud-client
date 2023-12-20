import { Avatar, Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import healthIcon from '../assets/icons/health.png';
import { getSocketURL } from '../config';
import type { ClientCommand, Prompt, PromptResponse } from '../types';
import { GroupMembers } from './GroupMembers';
import { Portrait } from './Portrait';

type CircularProgressWithLabelProps = {
  value: number;
};

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const size = isMobile ? 60 : 100;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} size={size} />
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
    <Box
      id="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgressWithLabel value={healthPercentage} />
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
