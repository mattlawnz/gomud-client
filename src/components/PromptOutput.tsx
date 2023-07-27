import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const PromptOutput = () => {
  const [currentMessage, setCurrentMessage] = useState<ServerResponse>({} as ServerResponse);
  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      console.log(`serverResponse: ${JSON.stringify(serverResponse)}`);
      return serverResponse.type === 'prompt';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setCurrentMessage(lastJsonMessage as ServerResponse);
    }
  }, [lastJsonMessage, setCurrentMessage]);

  console.log(`currentMessage: ${JSON.stringify(currentMessage)}`);

  if (!currentMessage) {
    return <Box></Box>;
  }

  let promptOutputValue = '';
  if (currentMessage.message) {
    promptOutputValue = currentMessage.message;
  } else {
    promptOutputValue = JSON.stringify(currentMessage.message);
  }

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {promptOutputValue}
      </Typography>
    </Box>
  );
};
