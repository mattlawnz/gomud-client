import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, Damage, FightUpdatesType } from '../types';
import { DamageDetailsComponent } from './DamageDetails';

export type FightComponentProps = {
  fightData: FightUpdatesType | null; // Note the null possibility
  damageData: Damage[];
  sendCommand: (_command: string) => void;
};

export type DamageDetailsProps = {
  damageData: Damage;
};

export type FightSummaryProps = {
  summaryData: FightUpdatesType;
};

export const FightComponent = ({ fightData, damageData }: FightComponentProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current !== null) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [damageData]);

  if (fightData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid grey',
          paddingBottom: '10px',
        }}
      >
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginRight: '15px' }}>Side 1:</div>
          <div>
            {fightData.participantsSide1.map((p, index) => (
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}
              >
                <img
                  src={p.portrait || 'default_image_url.jpg'}
                  alt={p.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50px' }}
                />
                <LinearProgress
                  variant="determinate"
                  value={(p.health / p.maxHealth) * 100}
                  style={{ width: '100px', marginTop: '5px' }}
                />
                <span>
                  {p.health}/{p.maxHealth}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div>
            {fightData.participantsSide2.map((p, index) => (
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}
              >
                <img
                  src={p.portrait || 'default_image_url.jpg'}
                  alt={p.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50px' }}
                />
                <LinearProgress
                  variant="determinate"
                  value={(p.health / p.maxHealth) * 100}
                  style={{ width: '100px', marginTop: '5px' }}
                />
                <span>
                  {p.health}/{p.maxHealth}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 'bold', marginLeft: '15px' }}>Side 2:</div>
        </div>
      </div>

      {/* The rest of your existing code */}
      <div
        ref={scrollContainerRef}
        style={{ textAlign: 'left', height: '400px', overflowY: 'auto', marginTop: '10px' }}
      >
        {damageData &&
          damageData.map((damage, index) => (
            <div key={index}>
              <DamageDetailsComponent serverResponse={{ type: 'damage', message: JSON.stringify(damage) }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export const FightView = () => {
  // console.log('FightView rendered');
  const [damageDetails, setDamageDetails] = useState<Damage[]>([]);
  const [fightDetails, setFightDetails] = useState<FightUpdatesType | null>(null);

  const { sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    onMessage: (event) => {
      // console.log('Received WebSocket message:', event.data);
      const message = JSON.parse(event.data);

      if (message.type === 'fightUpdates') {
        const fightUpdates: FightUpdatesType = JSON.parse(message.message);
        setFightDetails(fightUpdates);
      }

      if (message.type === 'damage') {
        const parsedDamage: Damage = JSON.parse(message.message);
        setDamageDetails((prev) => (Array.isArray(prev) ? [...prev, parsedDamage] : [parsedDamage]));
      }
    },
  });

  const sendCommand = (commandValue: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: commandValue,
    };
    sendJsonMessage(messageForServer);
  };
  return <FightComponent fightData={fightDetails} damageData={damageDetails} sendCommand={sendCommand} />;
};
