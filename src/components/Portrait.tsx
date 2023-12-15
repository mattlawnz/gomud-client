import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import elfFemale1Image from '../assets/images/elf_female_1.png';
import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

export const Portrait = () => {
  const [currentMessage, setCurrentMessage] = useState<ServerResponse>({} as ServerResponse);

  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'portrait';
    },
  });

  useEffect(() => {
    console.log('lastJsonMessage:', lastJsonMessage); // Log incoming WebSocket message
    if (lastJsonMessage !== null) {
      setCurrentMessage(lastJsonMessage as ServerResponse);
    }
  }, [lastJsonMessage, setCurrentMessage]);

  useEffect(() => {
    console.log('currentMessage:', currentMessage); // Log the current message state
  }, [currentMessage]);

  if (!currentMessage) {
    return <React.Fragment></React.Fragment>;
  }

  // Portrait element
  let portraitElement = <React.Fragment></React.Fragment>;
  if (currentMessage.type === 'portrait') {
    portraitElement = (
      <Avatar
        src={currentMessage.message}
        alt="Character Portrait"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
      />
    );
  } else {
    portraitElement = (
      <Avatar
        src={elfFemale1Image}
        alt="Character Portrait"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
      />
    );
  }

  return <React.Fragment>{portraitElement}</React.Fragment>;
};
