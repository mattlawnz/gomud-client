import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, createTheme, Drawer, Grid, IconButton, Modal, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

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
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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

  const toggleFullScreen = () => {
    setIsFullscreen(!isFullscreen);
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

  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <SkillsContext.Provider value={{ skills, setSkills }}>
        <Grid container style={{ position: 'fixed', top: 0, height: '100%' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleLeftDrawerToggle}
            sx={{ position: 'absolute', top: 0, left: 0, margin: 0, padding: 0, color: 'white', zIndex: 1201 }}
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
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
                '@media (min-width: 1440px)': {
                  width: 340,
                },
                '@media (min-width: 1996px)': {
                  width: 440,
                },
              },
            }}
          >
            <LeftAppBar toggleFullScreen={toggleFullScreen} />
            <CommandPrompt />
          </Drawer>

          <Grid item xs={12} style={{ height: '100%', overflowY: 'auto' }}>
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
            sx={{ position: 'absolute', top: 0, right: 0, margin: 0, padding: 0, color: 'white', zIndex: 1201 }}
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

          <Grid
            item
            xs={12}
            sx={{
              position: 'absolute',
              left: '0',
              bottom: '2px',
              width: 'calc(100% - 40px)',
              height: '15%',
              margin: '0 20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid white',
              transition: '0.3s ease-in-out',
              overflow: 'auto',
              zIndex: '15',
              '@media (max-width: 768px)': {
                width: 'calc(100% - 20px)',
                margin: '0 10px',
              },
            }}
          >
            <MyBottomNavigation />
          </Grid>
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
