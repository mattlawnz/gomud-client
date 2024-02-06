import { Box, Button } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { MonsterType, ServerResponse, Skill, SkillData } from '../types';

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
          buttonText: `${skill.name} (${skill.cooldown / 1000000000} sec)`,
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      let updated = false;

      const newSkills = Object.entries(skills).reduce<Record<string, Skill>>((acc, [name, skill]) => {
        if (skill.lastUsed > 0) {
          const timePassedSec = (now - skill.lastUsed) / 1000; // Convert milliseconds to seconds for time passed
          const cooldownSec = skill.cooldown / 1000000000; // Convert nanoseconds to seconds for cooldown
          const remainingCooldown = cooldownSec - timePassedSec;
          if (remainingCooldown <= 0) {
            // Cooldown has expired, so update skill to be available again
            acc[name] = {
              ...skill,
              lastUsed: 0,
              buttonText: `${skill.name} (${skill.cooldown / 1000000000} sec)`,
              isAvailable: true,
            };
            updated = true;
          } else {
            // Cooldown is still ongoing, update buttonText and keep it disabled
            acc[name] = {
              ...skill,
              buttonText: `${skill.name} (${remainingCooldown.toFixed(1)}s)`,
              isAvailable: false,
            };
            updated = true;
          }
        } else {
          // No cooldown, skill should remain unchanged
          acc[name] = skill;
        }
        return acc;
      }, {});

      if (updated) {
        setSkills(newSkills);
      }
    }, 1000); // Every second

    return () => clearInterval(intervalId);
  }, [skills]);

  const handleSkillUse = (skillName: string, monsterName: string) => {
    // Existing logic to send command to server
    sendJsonMessage({
      type: 'command',
      command: `useSkill ${skillName} ${monsterName}`,
    });

    // Set lastUsed to current time to start cooldown
    setSkills((prevSkills) => ({
      ...prevSkills,
      [skillName]: {
        ...prevSkills[skillName],
        lastUsed: Date.now(),
        isAvailable: false, // Immediately set isAvailable to false
      },
    }));

    // Existing logic to reset UI
    setShowMonsters(false);
    setSelectedSkill(null);
  };

  const skillButtons = Object.keys(skills).map((skillName) => {
    const skill = skills[skillName];
    return (
      <Button
        key={skillName}
        variant="contained"
        color="primary"
        disabled={!skill.isAvailable} // Disable button if skill is not available
        sx={{
          '@media (min-width: 1440px)': {
            fontSize: '26px !important',
          },
          '@media (min-width: 1996px)': {
            fontSize: '30px !important',
          },
        }}
        onClick={() => handleSkillClick(skillName)}
      >
        {skill.buttonText}
      </Button>
    );
  });

  return (
    <Box
      sx={{
        width: '100%',
        '@media (min-width: 1440px)': {
          fontSize: '26px !important',
        },
        '@media (min-width: 1996px)': {
          fontSize: '30px !important',
        },
      }}
    >
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
          <div style={{ color: 'white' }}>No targets available.</div>
        ))}
    </Box>
  );
};
