// This will show a basic input model which will be used to get a value from the user

import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientResponse, ServerResponse } from '../types';
import { CustomStyledItem } from './CustomStyledItem';

const inputModalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const InputModal = () => {
  // set the open state to true by default so it opens the modal right away
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = useState('');

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'init';
    },
  });

  if (!lastJsonMessage) {
    return <React.Fragment></React.Fragment>;
  }

  const serverResponse = lastJsonMessage as ServerResponse;

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    const messageForServer: ClientResponse = {
      type: 'init',
      response: message,
    };
    sendJsonMessage(messageForServer);
    setMessage('');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={inputModalStyle}>
          <Stack spacing={2}>
            <CustomStyledItem>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {JSON.stringify(serverResponse.message)}
              </Typography>
            </CustomStyledItem>
            <CustomStyledItem>
              <TextField
                id="standard-basic"
                name="response"
                label="Input value here"
                variant="standard"
                onChange={handleChange}
                value={message}
              />
            </CustomStyledItem>
            <CustomStyledItem>
              <Button variant="contained" onClick={handleClick}>
                Enter
              </Button>
            </CustomStyledItem>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
