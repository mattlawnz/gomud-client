import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { FightUpdatesType, ServerResponse } from '../types';

export function useFightData() {
  const [fightUpdate, setFightUpdate] = useState({} as FightUpdatesType);

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `room` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return (
        // serverResponse.type === 'damage' ||
        serverResponse.type === 'fightUpdate'
        // serverResponse.type === 'fightSummary'
      );
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setFightUpdate(lastJsonMessage as FightUpdatesType);
    }
  }, [lastJsonMessage, fightUpdate]);
  return fightUpdate;
}
