import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import goblinMale1Image from '../assets/images/goblin_male_1.png';
import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

export const EnemyIcon = () => {
  const [currentMessage, setCurrentMessage] = useState<ServerResponse>({} as ServerResponse);

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'enemyIcon';
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

  // EnemyIcon element
  let EnemyIconElement = <React.Fragment></React.Fragment>;
  if (currentMessage.type === 'EnemyIcon') {
    EnemyIconElement = (
      <img
        src={currentMessage.message}
        alt="Character EnemyIcon"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  } else {
    EnemyIconElement = (
      <img
        src={goblinMale1Image}
        alt="Character EnemyIcon"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return <React.Fragment>{EnemyIconElement}</React.Fragment>;
};
