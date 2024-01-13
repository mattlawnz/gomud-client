import { Button, ButtonGroup, Dialog, DialogTitle } from '@mui/material';
import { useState } from 'react';

import type { ItemDetails, ItemType } from '../types';
import { ItemDetailsComponent } from './ItemDetails';

export type ItemComponentProps = {
  itemsData: ItemType[];
  itemDetailsData: ItemDetails | null;
  sendCommand: (_command: string) => void;
};

export const ItemList = ({ itemsData, itemDetailsData, sendCommand }: ItemComponentProps) => {
  // const [items, setItems] = useState<ItemType[]>([]);
  const [openLookDialog, setOpenLookDialog] = useState(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
  //   share: true,
  //   filter(message: WebSocketEventMap['message']) {
  //     const serverResponse = JSON.parse(message.data) as ServerResponse;
  //     return serverResponse.type === 'itemsinroom';
  //   },
  // });

  // useEffect(() => {
  //   if (lastJsonMessage !== null) {
  //     const itemsInRoomResponse = lastJsonMessage as ItemsInRoomResponse;
  //     setItems(itemsInRoomResponse.itemNames);
  //   }
  // }, [lastJsonMessage]);

  const handleLook = (itemId: number) => {
    setActiveItemId(itemId); // Set the active item ID
    setOpenLookDialog(true); // Open the dialog
    sendCommand(`ilook ${itemId}`);
  };

  const handleGet = (item: ItemType) => {
    sendCommand(`iget ${item.itemInstanceID}`);
    setActiveItemId(null);
  };

  const itemToChat = (item: ItemType) => {
    sendCommand(`iget ${item.itemInstanceID}`);
    setActiveItemId(null);
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
      {itemsData &&
        itemsData.map((item, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            size="small"
            orientation="vertical"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button
              onClick={() => setActiveItemId(activeItemId === item.itemInstanceID ? null : item.itemInstanceID)}
              style={{ color: item.itemColor ? item.itemColor : 'inherit' }} // Use the item's color if provided
            >
              {item.itemName}
            </Button>
            {activeItemId === item.itemInstanceID && (
              <>
                <Button
                  onClick={() => handleLook(item.itemInstanceID)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Look
                </Button>
                <Button
                  onClick={() => handleGet(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Get
                </Button>
                <Button
                  onClick={() => itemToChat(item)}
                  sx={{
                    '@media (min-width: 1440px)': {
                      fontSize: '18px !important',
                    },
                    '@media (min-width: 1996px)': {
                      fontSize: '30px !important',
                    },
                  }}
                >
                  Chat
                </Button>
              </>
            )}
          </ButtonGroup>
        ))}
      <Dialog open={openLookDialog} onClose={() => setOpenLookDialog(false)}>
        <DialogTitle id="look-dialog-title">Item Details</DialogTitle>
        <ItemDetailsComponent itemDetailsData={itemDetailsData} sendCommand={sendCommand} />
      </Dialog>
    </div>
  );
};
