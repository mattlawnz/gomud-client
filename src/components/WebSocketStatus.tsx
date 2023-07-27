import { Typography } from '@mui/material';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { getSocketURL } from '../config';

// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const WebSocketStatus = () => {
  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { readyState } = useWebSocket(getSocketURL(), {
    share: true,
  });

  // This is to show the status of the websocket connection
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Typography id="modal-modal-title" variant="h6" component="h2">
      The WebSocket is currently {connectionStatus}
    </Typography>
  );
};
