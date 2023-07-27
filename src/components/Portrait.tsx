import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

export const Portrait = () => {
  const [currentMessage, setCurrentMessage] = useState<ServerResponse>({} as ServerResponse);

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'portrait';
    },
  });
  useEffect(() => {
    if (lastJsonMessage !== null) {
      setCurrentMessage(lastJsonMessage as ServerResponse);
    }
  }, [lastJsonMessage, setCurrentMessage]);

  if (!currentMessage) {
    return <React.Fragment></React.Fragment>;
  }

  // Portrait element
  let portraitElement = <React.Fragment></React.Fragment>;
  if (currentMessage.type === 'portrait') {
    portraitElement = (
      <img
        src={currentMessage.message}
        alt="Character Portrait"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  } else {
    portraitElement = (
      <img
        src="images/elf_female_1.png"
        alt="Character Portrait"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return <React.Fragment>{portraitElement}</React.Fragment>;
};
