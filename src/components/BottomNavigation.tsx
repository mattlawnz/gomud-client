import { Button } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, MonsterType, ServerResponse, Skill, SkillData } from '../types';

type SkillsContextType = {
  skills: { [key: string]: Skill };
  setSkills: React.Dispatch<React.SetStateAction<{ [key: string]: Skill }>>;
};

export const SkillsContext = createContext<SkillsContextType>({
  skills: {},
  setSkills: () => {},
});

export type MonsterInRoomData = {
  type: string;
  monsterDescriptions: MonsterType[];
};

export const MyBottomNavigation = () => {
  const [skills, setSkills] = useState<{ [key: string]: Skill }>({});
  const [monstersInRoom, setMonstersInRoom] = useState<MonsterType[]>([]);
  const [showMonsters, setShowMonsters] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerResponse>(getSocketURL(), {
    share: true,
    filter: (message: WebSocketEventMap['message']) => {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'skills' || serverResponse.type === 'monstersinroom';
    },
  });

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(skillName);
    setShowMonsters(true);
  };

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'skills') {
      const skillData = lastJsonMessage as unknown as SkillData;
      const newSkills: { [key: string]: Skill } = {};
      skillData.skills.forEach((skill) => {
        newSkills[skill.name] = {
          ...skill,
          lastUsed: 0,
          buttonText: skill.name,
          isAvailable: true,
        };
      });
      setSkills(newSkills);
    }
    if (lastJsonMessage && lastJsonMessage.type === 'monstersinroom') {
      const monsterData = lastJsonMessage as unknown as MonsterInRoomData;
      setMonstersInRoom(monsterData.monsterDescriptions);
    }
  }, [lastJsonMessage]);

  const handleSkillUse = (skillName: string, monsterName: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `useSkill ${skillName} ${monsterName}`,
    };

    console.log('messageForServer', messageForServer);
    sendJsonMessage(messageForServer);

    // Reset the UI
    setShowMonsters(false);
    setSelectedSkill(null);
  };

  const skillButtons = Object.keys(skills)
    .filter((skillName) => skills[skillName].isAvailable)
    .map((skillName) => {
      return (
        <Button key={skillName} variant="contained" color="primary" onClick={() => handleSkillClick(skillName)}>
          {skills[skillName].buttonText}
        </Button>
      );
    });

  // const handleSkillUse = (skillName: string, monsterName?: string) => {
  //   const target = monsterName || 'goblin'; // default to 'goblin'
  //   const messageForServer: ClientCommand = {
  //     type: 'command',
  //     command: `useSkill ${skillName} ${target}`,
  //   };
  //   console.log('messageForServer', messageForServer);
  //   sendJsonMessage(messageForServer);

  //   setSkills((prevSkills) => ({
  //     ...prevSkills,
  //     [skillName]: {
  //       ...prevSkills[skillName],
  //       lastUsed: Date.now(),
  //     },
  //   }));
  // };

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#ccc' }}>
      {skillButtons}
      {showMonsters &&
        selectedSkill &&
        (monstersInRoom?.length > 0 ? (
          monstersInRoom.map((monster) => (
            <Button
              key={monster.monsterName}
              variant="contained"
              color="secondary"
              onClick={() => handleSkillUse(selectedSkill, monster.monsterName)}
            >
              Use {selectedSkill} on {monster.monsterName}
            </Button>
          ))
        ) : (
          <div>No targets available.</div>
        ))}
    </div>
  );
};
