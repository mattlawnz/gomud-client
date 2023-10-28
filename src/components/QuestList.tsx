import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, QuestType, ServerResponse } from '../types';

export const QuestList = () => {
  const [activeQuestId, setActiveQuestId] = useState<number | null>(null);
  const [quests, setQuests] = useState<QuestType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestType | null>(null);
  const handleInfoClick = (quest: QuestType) => {
    setSelectedQuest(quest);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'quest';
    },
  });

  interface ServerQuestMessage {
    message: string;
    type: string;
  }

  useEffect(() => {
    if (lastJsonMessage !== null) {
      try {
        // Explicitly tell TypeScript the shape of `lastJsonMessage`
        const serverMessage = (lastJsonMessage as unknown as ServerQuestMessage).message;
        const questResponse = JSON.parse(serverMessage) as QuestType;

        setQuests((prevQuests) => {
          const existingQuestIndex = prevQuests.findIndex((q) => q.id === questResponse.id);

          if (existingQuestIndex !== -1) {
            const updatedQuests = [...prevQuests];
            updatedQuests[existingQuestIndex] = questResponse;
            return updatedQuests;
          }

          return [...prevQuests, questResponse];
        });
      } catch (error) {
        console.error('Received invalid quest data: ', error);
      }
    }
  }, [lastJsonMessage]);

  return (
    <div style={{ textAlign: 'left' }}>
      {quests &&
        quests.map((quest, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button onClick={() => setActiveQuestId(activeQuestId === quest.id ? null : quest.id)}>
              <span style={{ color: 'yellow' }}>?</span>
            </Button>
            {activeQuestId === quest.id && (
              <>
                <Button onClick={() => handleInfoClick(quest)}>Info</Button>
                <Button
                  onClick={() => {
                    const messageForServer: ClientCommand = {
                      type: 'command',
                      command: `acceptQuest ${quest.id}`,
                    };
                    sendJsonMessage(messageForServer);
                    setActiveQuestId(null);
                  }}
                >
                  Accept
                </Button>
              </>
            )}
          </ButtonGroup>
        ))}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{selectedQuest?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Description: {selectedQuest?.description} <br />
            Objective: {selectedQuest?.objective} <br />
            Reward: {selectedQuest?.reward.exp} EXP, {selectedQuest?.reward.gold} gold
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
