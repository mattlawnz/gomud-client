import { Button, Divider, Grid, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ClientCommand, ServerResponse, SkillTree } from '../types';

type SkillTreeProps = {
  serverResponse: ServerResponse;
};

export const SkillTreeComponent = (props: SkillTreeProps) => {
  const { serverResponse } = props;

  // Initialize with parsed skilltree if available
  let initialSkills: SkillTree[] = [];
  if (serverResponse.message) {
    try {
      initialSkills = JSON.parse(serverResponse.message);
    } catch (err) {
      console.error('Error parsing skill tree:', err);
    }
  }

  const [skills, setSkills] = useState<SkillTree[]>(initialSkills);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ServerResponse>(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'skilltree';
    },
  });

  // For the popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<string>('');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, content: string) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // end the popover

  useEffect(() => {
    if (lastJsonMessage?.type === 'skilltree' && lastJsonMessage.message) {
      let parsedSkills: SkillTree[] = [];
      try {
        parsedSkills = JSON.parse(lastJsonMessage.message);
      } catch (error) {
        console.error('Error parsing skills:', error);
      }
      if (parsedSkills.length > 0) {
        setSkills(parsedSkills);
      }
    }
  }, [lastJsonMessage]);

  const handlePracticeClick = (skillOrEnhancementName: string) => {
    const messageForServer: ClientCommand = {
      type: 'command',
      command: `practice ${skillOrEnhancementName}`,
    };
    sendJsonMessage(messageForServer);
  };

  const groupByTier = (skills: SkillTree[]) => {
    return skills.reduce(
      (acc, skill) => {
        if (!acc[skill.Tier]) acc[skill.Tier] = [];
        acc[skill.Tier].push(skill);
        return acc;
      },
      {} as { [key: number]: SkillTree[] },
    );
  };

  interface GroupedSkills {
    [key: number]: SkillTree[];
  }
  // console.log('Skills:', skills);
  const groupedSkills: GroupedSkills = groupByTier(skills?.filter((skill) => skill.IsAvailable));
  // console.log('Grouped Skills:', groupedSkills);
  return (
    <div>
      {/* <Typography variant="h6">Available Skills and Enhancements</Typography> */}
      {/* ... */}
      {Object.keys(groupedSkills).map((tier) => (
        <div key={`tier-${tier}`}>
          <Typography variant="h6" align="center">{`Tier ${tier}`}</Typography>
          <Grid container direction="row" spacing={3}>
            {groupedSkills[Number(tier)].map((skill, index) => (
              <Grid item xs={12 / groupedSkills[Number(tier)].length} key={skill.Name}>
                {/* ... */}
                <div>
                  <Grid container alignItems="center" justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="subtitle1">{`${skill.Name} (Level ${skill.CurrentLevel})`}</Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => handlePracticeClick(skill.Name)}>Practice</Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={(e) => handleClick(e, skill.Description)}>Info</Button>
                    </Grid>
                  </Grid>
                  {skill.Enhancements.map((enhancement, enhancementIndex) => (
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="flex-start"
                      style={{ marginLeft: 20 }}
                      key={`${enhancement.Name}-${enhancementIndex}`}
                    >
                      <Grid item>
                        <Typography variant="subtitle2">{`${enhancement.Name} (Level ${
                          enhancement.CurrentLevel || 0
                        })`}</Typography>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => handlePracticeClick(enhancement.Name)}>Practice</Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={(e) => handleClick(e, enhancement.Description)}>Info</Button>
                      </Grid>
                    </Grid>
                  ))}
                  {index < groupedSkills[Number(tier)].length - 1 && <Divider style={{ margin: '20px 0' }} />}
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: '10px', whiteSpace: 'pre-line' }} sx={{ p: 2 }}>
          {popoverContent}
        </Typography>
      </Popover>
    </div>
  );
};
