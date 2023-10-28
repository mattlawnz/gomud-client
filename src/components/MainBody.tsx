import React from 'react';
import useWebSocket from 'react-use-websocket';

import { AuthStatus } from '../AuthStatus';
import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';
import { FightView } from './Fight';
import { MessageHistory } from './MessageHistory';
import { RoomView } from './Room';

// export type MainBodyComponentProps = {
//   mainbodyData: MainBodyType;
//   sendCommand: (_command: string) => void;
// };

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
      <React.Fragment>
        <RoomView />
        <MessageHistory />
        <AuthStatus />
      </React.Fragment>
    );
  }
};

export const MainBodyView = () => {
  // const mainbodyData = useMainBodyData();
  // const { sendJsonMessage } = useWebSocket(getSocketURL(), {
  //   share: true,
  // });

  // const sendCommand = (commandValue: string) => {
  //   const messageForServer: ClientCommand = {
  //     type: 'command',
  //     command: commandValue,
  //   };
  //   sendJsonMessage(messageForServer);
  // };

  // return <MainBodyComponent mainbodyData={mainbodyData} sendCommand={sendCommand} />;
  return <MainBodyComponent />;
};
