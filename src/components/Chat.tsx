import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ChatItemType, ChatMonsterType, ChatTextServerResponse, ServerResponse } from '../types';

export const ChatWindow = () => {
  const [chatMessages, setChatMessages] = useState<Array<ServerResponse>>([]);
  const [selectedDetail, setSelectedDetail] = useState<null | unknown>(null);
  const [open, setOpen] = useState(false);

  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return ['chatText', 'chatItem', 'chatMonster'].includes(serverResponse.type);
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setChatMessages((prevMessages) => [...prevMessages, lastJsonMessage as ServerResponse]);
    }
  }, [lastJsonMessage]);

  const handleDetailClick = (detail: unknown) => {
    setSelectedDetail(detail);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Chat Window</h1>
      <div>
        {chatMessages.map((message, index) => {
          const key = `msg-${index}`;
          try {
            switch (message.type) {
              case 'chatText': {
                const chatTextData = message as unknown as ChatTextServerResponse;
                return <p key={key}>{`${chatTextData.text.from}: ${chatTextData.text.text}`}</p>;
              }
              case 'chatMonster': {
                const monsterData = message as unknown as ChatMonsterType;
                return (
                  <div key={key}>
                    <strong>{`${monsterData.monster.from}: `}</strong>
                    <button onClick={() => handleDetailClick(monsterData.monster)}>Monster Encounter</button>
                  </div>
                );
              }
              case 'chatItem': {
                const itemData = message as unknown as ChatItemType;
                return (
                  <div key={key}>
                    <strong>{`${itemData.item.from || 'Unknown'}: `}</strong>
                    <button onClick={() => handleDetailClick(itemData.item)}>Found an Item</button>
                  </div>
                );
              }
              default:
                console.log(`Unexpected message type or missing data: ${JSON.stringify(message)}`);
                return null;
            }
          } catch (error) {
            console.error('Parsing or handling failed: ', error);
            return null;
          }
        })}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detail Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <pre>{JSON.stringify(selectedDetail, null, 2)}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
