import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const RawMessageHistory = () => {
  const [rawMessageHistory, setRawMessageHistory] = useState<ServerResponse[]>([]);

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { lastJsonMessage } = useWebSocket(getSocketURL(), { share: true });

  // useEffect is a React Hook that lets you synchronize a component with an external system
  // https://react.dev/reference/react/useEffect
  // Whenever anything in the dependencies "[lastJsonMessage, setMessageHistory]" changes, useEffect will be called
  // Usually `lastJsonMessage` will change when it receives new message from the server
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if ((lastJsonMessage as ServerResponse).type === 'prompt') {
        // we do not want to add the prompt to the message history as it'll be too much
        return;
      }
      setRawMessageHistory((prevMessages) => [...prevMessages, lastJsonMessage as ServerResponse]);
    }
  }, [lastJsonMessage, setRawMessageHistory]);

  return (
    <React.Fragment>
      {/* Show raw json messages */}
      <ul>
        {rawMessageHistory.map((message, idx) => (
          <div key={idx}>
            <span>{message ? JSON.stringify(message) : null}</span>
            <br />
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};
