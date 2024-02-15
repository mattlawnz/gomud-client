import { SnackbarProvider } from 'notistack';
import React from 'react';

import { MessageHistory } from './MessageHistory';
import { RoomView } from './Room';

export const MainBodyComponent = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <React.Fragment>
        <RoomView />
        <MessageHistory />
      </React.Fragment>
    </SnackbarProvider>
  );
};

export const MainBodyView = () => {
  return <MainBodyComponent />;
};
