import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import type { RoomType } from '../components/Room';
import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

export function useRoomData() {
  const [room, setRoom] = useState({} as RoomType);

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `room` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'room';
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setRoom(lastJsonMessage as RoomType);
    }
  }, [lastJsonMessage, setRoom]);
  return room;
}
