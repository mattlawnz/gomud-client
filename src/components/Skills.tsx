import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ServerResponse } from '../types';

type Skill = {
  cooldown: number;
  currentLevel: number;
  enhancements: Enhancement[];
  name: string;
  lastUsed: number;
  buttonText: string;
  isAvailable: boolean;
};

type Enhancement = {
  level: number;
  name: string;
};

type SkillData = {
  type: string;
  skills: Skill[];
};

export const Skills = () => {
  const [skills, setSkills] = useState<{
    [key: string]: Skill & { lastUsed: number; buttonText: string; isAvailable: boolean };
  }>({});

  const { lastJsonMessage, sendJsonMessage } = useWebSocket<SkillData>(getSocketURL(), {
    share: true,
    filter: (message) => {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'skills';
    },
  });

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.skills) {
      console.log('lastJsonMessage', lastJsonMessage); // Debugging line
      const newSkills: { [key: string]: Skill & { lastUsed: number } } = {};
      lastJsonMessage.skills.forEach((skill) => {
        newSkills[skill.name] = {
          ...skill,
          lastUsed: 0,
        };
      });
      setSkills(newSkills);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSkills((prevSkills) => {
        console.log('prevSkills', prevSkills); // Debugging line
        const now = Date.now();
        const updatedSkills = { ...prevSkills };

        for (const skillName in prevSkills) {
          const skill = updatedSkills[skillName];
          const lastUsed = skill.lastUsed || 0;
          const cooldownRemaining = lastUsed + skill.cooldown * 1000 - now;

          if (cooldownRemaining > 0) {
            skill.buttonText = `${skillName} (${Math.ceil(cooldownRemaining / 1000)}s)`;
            skill.isAvailable = false;
          } else {
            skill.buttonText = skillName;
            skill.isAvailable = true;
          }
        }

        return updatedSkills;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSkillUse = (skillName: string) => {
    console.log('skillName', skillName); // Debugging line
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `useSkill ${skillName} goblin`,
    };

    console.log('messageForServer', messageForServer); // Debugging line
    sendJsonMessage(messageForServer);
    setSkills((prevSkills) => ({
      ...prevSkills,
      [skillName]: {
        ...prevSkills[skillName],
        lastUsed: Date.now(),
      },
    }));
  };

  return (
    <div>
      {Object.keys(skills).map((skillName) => (
        <Button
          key={skillName}
          variant="contained"
          style={{ backgroundColor: skills[skillName].isAvailable ? 'green' : 'gray' }}
          onClick={() => handleSkillUse(skillName)}
        >
          {skills[skillName].buttonText}
        </Button>
      ))}
    </div>
  );
};
