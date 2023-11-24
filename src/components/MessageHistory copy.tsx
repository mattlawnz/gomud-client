import '../index.css';

import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

// import { useComponentsOrder } from '../ComponentsOrderContext';
import { getSocketURL } from '../config';
import type { ServerResponse } from '../types';
import { ScoreComponent } from './CharacterScore';
import { DamageDetailsComponent } from './DamageDetails';
import { EquipmentComponent } from './Equipment';
import { FightSummaryComponent } from './FightSummary';
// import MiniMap from './MiniMap';
import { GroupInviteComponent } from './GroupInvite';
import { InventoryComponent } from './Inventory';
import { ItemDetailsComponent } from './ItemDetails';
import { LookCharacterComponent } from './LookCharacter';
import { MonsterDetailComponent } from './MonsterDetails';
import { SkillTreeComponent } from './SkillTree';
// This will show a basic input model which will be used to get a value from the user
// and send it to the server
export const MessageHistory = () => {
  // const { components } = useComponentsOrder();
  // const [components, setComponents] = useState([]);
  const [rawMessageHistory, setRawMessageHistory] = useState<ServerResponse[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lastJsonMessage } = useWebSocket(getSocketURL(), { share: true });
  const { enqueueSnackbar } = useSnackbar();
  // Function to push a component to the top
  // const pushComponentToTop = (Component) => {
  //   setComponents((prevComponents) => [Component, ...prevComponents]);
  // };

  useEffect(() => {
    if (
      lastJsonMessage !== null &&
      (lastJsonMessage as ServerResponse).type !== 'prompt' &&
      (lastJsonMessage as ServerResponse).type !== 'portrait' &&
      (lastJsonMessage as ServerResponse).type !== 'itemsinroom' &&
      (lastJsonMessage as ServerResponse).type !== 'monstersinroom' &&
      (lastJsonMessage as ServerResponse).type !== 'exits' &&
      (lastJsonMessage as ServerResponse).type !== 'room' &&
      (lastJsonMessage as ServerResponse).type !== 'fightUpdates' &&
      (lastJsonMessage as ServerResponse).type !== 'consumables'
    ) {
      console.log('Got message from server:', lastJsonMessage);
      setRawMessageHistory((prevMessages) => [lastJsonMessage as ServerResponse, ...prevMessages]);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0; // Set the scroll position to the top
      }
    }
  }, [lastJsonMessage, setRawMessageHistory]);

  // console.log('Components:', components);
  return (
    <React.Fragment>
      {/* {components.map(({ key, component }) => (
        <React.Fragment key={key}>{component}</React.Fragment>
      ))} */}
      <div
        className="message-container"
        ref={containerRef}
        style={{
          height: '400px',
          overflowY: 'auto',
          padding: '0',
          margin: '0',
        }}
      >
        {rawMessageHistory.map((message, idx) => (
          <div key={idx} style={{ margin: '0', padding: '0' }}>
            {message.type === 'score' && <ScoreComponent serverResponse={message} />}
            {message.type === 'monsterDetails' && <MonsterDetailComponent serverResponse={message} />}
            {message.type === 'fightSummary' && <FightSummaryComponent serverResponse={message} />}
            {message.type === 'itemDetails' && <ItemDetailsComponent serverResponse={message} />}
            {/* {message.type === 'fight' && <FightComponent serverResponse={message} />} */}
            {message.type === 'inventory' && <InventoryComponent serverResponse={message} />}
            {message.type === 'groupInvite' && <GroupInviteComponent serverResponse={message} />}
            {message.type === 'equipment' && <EquipmentComponent serverResponse={message} />}
            {message.type === 'skilltree' && <SkillTreeComponent serverResponse={message} />}
            {message.type === 'damage' && <DamageDetailsComponent serverResponse={message} />}
            {message.type === 'lookcharacter' && <LookCharacterComponent serverResponse={message} />}
            {/* {message.type === 'updateMap' && <MiniMap serverResponse={message} />} */}
            {/* {message.type === 'message' } */}
            <span>{message.type === 'message' ? JSON.stringify(message.message) : null}</span>
            {/* <br /> */}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
