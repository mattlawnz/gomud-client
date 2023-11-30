import { SnackbarProvider } from 'notistack';
import React from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';
import { FightView } from './Fight';
import { MessageHistory } from './MessageHistory';
import { RoomView } from './Room';

export const MainBodyComponent = () => {
  // const [currentView, setCurrentView] = useState('room');

  const { lastJsonMessage } = useWebSocket<ServerResponse>(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'view';
    },
  });

  if (lastJsonMessage && lastJsonMessage.message === 'fight') {
    return (
      <React.Fragment>
        <FightView />
      </React.Fragment>
    );
  } else {
    return (
      <SnackbarProvider maxSnack={3}>
        <React.Fragment>
          <RoomView />
          <MessageHistory />
        </React.Fragment>
      </SnackbarProvider>
    );
  }
};

export const MainBodyView = () => {
  return <MainBodyComponent />;
};
