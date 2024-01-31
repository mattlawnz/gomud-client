import { Button, ButtonGroup } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

import type { MonsterType } from '../types';
import type { SecondaryView } from './Room';

export type MonsterComponentProps = {
  monstersData: MonsterType[];
  // monsterDetailsData: MonsterDetail | null;
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};
export const MonsterList = ({ monstersData, sendCommand }: MonsterComponentProps) => {
  // const [monsters, setMonsters] = useState<MonsterType[]>([]);
  // const [monsterDetail, setMonsterDetail] = useState<MonsterDetail>();
  // const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);
  // const [openLookDialog, setOpenLookDialog] = useState(false);
  const [activeMonsterId, setActiveMonsterId] = useState<number | null>(null);
  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(getSocketURL(), {
  //   share: true,
  //   filter(message: WebSocketEventMap['message']) {
  //     const serverResponse = JSON.parse(message.data) as ServerResponse;

  //     // this component will accept all messages of type 'monstersinroom' or 'monsterDetails'
  //     return serverResponse.type === 'monstersinroom' || serverResponse.type === 'monsterDetails';
  //   },
  // });

  // const handleLookButtonClick = (monsterId: number) => {
  //   setActiveMonsterId(monsterId); // Set the active monster ID
  //   // setOpenLookDialog(true); // Open the dialog
  //   sendCommand(`mlook ${monsterId}`, 'monsterDetails');
  // };

  // useEffect(() => {
  //   if (lastJsonMessage) {
  //     // determine what type we have received so we can do parse to different type and update state accordingly
  //     const serverResponse = lastJsonMessage as ServerResponse;
  //     // for type 'monstersinroom', we need to show a list of monsters
  //     if (serverResponse.type === 'monstersinroom') {
  //       const monstersResponse = lastJsonMessage as MonstersInRoomResponse;
  //       console.log('Monsters in room:', monstersResponse.monsterDescriptions); // Debugging log
  //       setMonsters(monstersResponse.monsterDescriptions);
  //     }
  //     // for type 'monsterDetails', we need to show a dialog with monster details
  //     // else if (serverResponse.type === 'monsterDetails') {
  //     //   try {
  //     //     const details = JSON.parse(serverResponse.message) as MonsterDetail;
  //     //     setMonsterDetail(details);
  //     //     setOpenLookDialog(true);
  //     //   } catch (error) {
  //     //     console.error('Error parsing monster details:', error);
  //     //     //TODO: Do something useful here, like show an error message to the user instead of writing to console only
  //     //   }
  //     // }
  //   }
  // }, [lastJsonMessage]);

  return (
    <div>
      {monstersData &&
        monstersData.map((monster, idx) => (
          <ButtonGroup
            key={idx}
            variant="text"
            style={{ justifyContent: 'flex-start', display: 'block', marginBottom: '10px' }}
          >
            <Button
              onClick={() =>
                setActiveMonsterId(activeMonsterId === monster.monsterInstanceID ? null : monster.monsterInstanceID)
              }
            >
              {/* Use Avatar for monster icon */}
              <Avatar
                src={monster.monsterIcon ? `/images/${monster.monsterIcon}` : ''}
                alt={monster.monsterName}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              >
                {/* Display the monster's name if there's no icon */}
                {!monster.monsterIcon && monster.monsterName}
              </Avatar>
              {/* <span>{monster.shortDescription + ' (HP: ' + monster.currentHealthPoints + ')'}</span> */}
              <span>{monster.shortDescription}</span>
            </Button>
            {activeMonsterId === monster.monsterInstanceID && (
              <>
                <Button onClick={() => sendCommand(`mlook ${monster.monsterInstanceID}`, 'monsterDetails')}>
                  {' '}
                  {/* Updated this line */}
                  Look
                </Button>
                <Button
                  onClick={() => {
                    sendCommand(`mkill ${monster.monsterInstanceID}`, null);
                    setActiveMonsterId(null); // Hide the additional buttons after clicking
                  }}
                >
                  Attack
                </Button>
                <Button
                  onClick={() => {
                    // const messageForServer: ClientCommand = {
                    //   type: 'command',
                    //   command: `monsterToChat ${monster.monsterInstanceID}`,
                    // };
                    // sendJsonMessage(messageForServer);
                    sendCommand(`monsterToChat ${monster.monsterInstanceID}`, null);
                    setActiveMonsterId(null); // Hide the additional buttons after clicking
                  }}
                >
                  Chat
                </Button>
              </>
            )}
          </ButtonGroup>
        ))}
      {/* Dialog for displaying monster details */}(
      {/* <Dialog open={openLookDialog} onClose={() => setOpenLookDialog(false)}>
        <DialogTitle id="look-dialog-title">Monster Details</DialogTitle>
        <MonsterDetailComponent monsterDetailsData={monsterDetailsData} sendCommand={sendCommand} />
      </Dialog> */}
      )
    </div>
  );
};
