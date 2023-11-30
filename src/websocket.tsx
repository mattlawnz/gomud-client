import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, createTheme, Drawer, Grid, IconButton, Modal, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { ActionButtonsRight } from './components/ActionButtonsRight';
import { MyBottomNavigation, SkillsContext } from './components/BottomNavigation';
import { ChatWindow } from './components/Chat';
import { CommandPrompt } from './components/CommandPrompt';
import { MainBodyView } from './components/MainBody';
import { MiniMap } from './components/MiniMap';
import { getSocketURL } from './config';
import { LeftAppBar } from './LeftAppBar';
import type { CharacterType, ClientResponse, ServerResponse } from './types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b39ddb',
    },
    secondary: {
      main: '#8e24aa',
    },
  },
  // Add any additional customization here
});

interface WebSocketComponentProps {
  character: CharacterType;
}

export const WebSocketComponent = (props: WebSocketComponentProps) => {
  const [character] = useState(props.character);
  const [skills, setSkills] = useState({});

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightModalOpen, setRightModalOpen] = useState(false);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const handleRightModalToggle = () => {
    setRightModalOpen(!rightModalOpen);
  };

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter: (message) => {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'characterUUID';
    },
  });

  // Add a state to control the chat drawer
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to toggle chat drawer
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if ((lastJsonMessage as ServerResponse).type === 'characterUUID') {
        const messageForServer: ClientResponse = {
          type: 'init',
          response: character.uuid!,
        };
        sendJsonMessage(messageForServer);
      }
    }
  }, [character, lastJsonMessage, sendJsonMessage]);

  return (
    <ThemeProvider theme={darkTheme}>
      <SkillsContext.Provider value={{ skills, setSkills }}>
        <Grid container style={{ height: '100vh', overflow: 'hidden' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleLeftDrawerToggle}
            sx={{ position: 'absolute', top: 10, left: 10, margin: 0, padding: 0, color: 'white', zIndex: 1201 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            variant="temporary"
            open={leftDrawerOpen}
            onClose={handleLeftDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            <LeftAppBar />
            <CommandPrompt />
          </Drawer>

          <Grid item xs={12} style={{ height: 'calc(100vh - height_of_bottom_bar)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <MainBodyView />
              {/* <ChatWindow /> */}
            </div>
          </Grid>

          {/* Hamburger */}
          <IconButton
            aria-label="open modal"
            edge="end"
            onClick={handleRightModalToggle}
            sx={{ position: 'absolute', top: 20, right: 20, margin: 0, padding: 0, color: 'white', zIndex: 1201 }}
          >
            <MenuIcon />
          </IconButton>

          <Modal
            open={rightModalOpen}
            onClose={handleRightModalToggle}
            aria-labelledby="minimap-modal-title"
            aria-describedby="minimap-modal-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={{ outline: 'none', position: 'relative', p: 4, bgcolor: 'background.paper' }}>
              <IconButton
                aria-label="close"
                onClick={handleRightModalToggle}
                sx={{ position: 'absolute', top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
              <MiniMap />
            </Box>
          </Modal>

          <Grid item xs={12}>
            <MyBottomNavigation />
          </Grid>
          {/* Position ActionButtonsRight */}
          <Box sx={{ position: 'fixed', right: 10, bottom: 10, zIndex: 1300 }}>
            <ActionButtonsRight />
          </Box>
        </Grid>
        {/* Toggle Chat Icon */}
        <IconButton onClick={toggleChat} sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1400 }}>
          <ChatIcon />
        </IconButton>
      </SkillsContext.Provider>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={toggleChat}
        sx={{
          '& .MuiDrawer-paper': { width: '300px', padding: '10px' }, // Adjust width and padding as needed
        }}
      >
        {/* Inside the ChatWindow, you should manage the display of messages */}
        <ChatWindow />
      </Drawer>
    </ThemeProvider>
  );
};
