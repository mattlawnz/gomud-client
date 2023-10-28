import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand } from '../types';

// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const CommandPrompt = () => {
  // Create a state to save the textfield value that will be sent to server as command
  const [commandValue, setCommandValue] = useState('');

  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
  });

  // This function will be called whenever the text in textfield changes
  // It will save the text in the component state so it can be used as a command when `Send` button is clicked
  const handleTextFieldChange = (event: { target: { value: string } }) => {
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters except spaces
    setCommandValue(() => sanitizedValue);
  };

  // This function is for `Send` button to send the command in text field to the server
  const sendCommandFromTextField = () => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `textToChat ${commandValue}`, // Prefix commandValue with 'textToChat'
    };
    sendJsonMessage(messageForServer);
  };

  return (
    <React.Fragment>
      <TextField
        id="standard-basic"
        name="response"
        label="Chat"
        variant="standard"
        onChange={handleTextFieldChange}
        value={commandValue}
      />
      <Button variant="contained" onClick={sendCommandFromTextField}>
        Send
      </Button>
    </React.Fragment>
  );
};
