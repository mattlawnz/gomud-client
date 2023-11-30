import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';

export const MessageHistory = () => {
  const { lastJsonMessage } = useWebSocket(getSocketURL(), { share: true });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Casting the message to ServerResponse type
    const messageData = lastJsonMessage as ServerResponse;

    if (
      messageData &&
      messageData.type !== 'prompt' &&
      messageData.type !== 'portrait' &&
      messageData.type !== 'itemsinroom' &&
      messageData.type !== 'monstersinroom' &&
      messageData.type !== 'exits' &&
      messageData.type !== 'room' &&
      messageData.type !== 'fightUpdates' &&
      messageData.type !== 'consumables'
    ) {
      let messageContent;
      try {
        // Attempt to pretty print the JSON
        messageContent = JSON.stringify(messageData.message, null, 2);
      } catch (error) {
        // Fallback for non-stringifiable content
        messageContent = 'Unreadable message content';
      }

      if (messageContent && messageContent.length < 500) {
        // Check for very large content
        enqueueSnackbar(messageContent, {
          variant: 'info',
          autoHideDuration: 5000,
        });
      }
    }
  }, [lastJsonMessage, enqueueSnackbar]);

  return null;
};
