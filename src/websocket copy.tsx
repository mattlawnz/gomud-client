import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { MyBottomNavigation, SkillsContext } from './components/BottomNavigation';
import { ChatWindow } from './components/Chat';
import { CommandPrompt } from './components/CommandPrompt';
import { CustomStyledItem } from './components/CustomStyledItem';
import { MainBodyView } from './components/MainBody';
import { getSocketURL } from './config';
import { LeftAppBar } from './LeftAppBar';
import { RightAppBar } from './RightAppBar';
import type { CharacterType, ClientResponse, ServerResponse } from './types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Use 'mode' instead of 'type'
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
  toggleTheme?: () => void; // Note the '?'
  theme?: string; // Note the '?'
}

export const WebSocketComponent = (props: WebSocketComponentProps) => {
  const [character] = useState(props.character);
  const [skills, setSkills] = useState({});
  // this will share the main websocket connection with the parent component because we have share:true
  // the filter will help us to only get the messages that we want i.e. where type is `prompt` for this component
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter: (message) => {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'characterUUID';
    },
  });

  // useEffect is a React Hook that lets you synchronize a component with an external system
  // https://react.dev/reference/react/useEffect
  // Whenever anything in the dependencies "[lastJsonMessage, setMessageHistory]" changes, useEffect will be called
  // Usually `lastJsonMessage` will change when it receives new message from the server
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

  //const theme = useTheme();

  console.log('props', props); // Debugging line

  return (
    <ThemeProvider theme={darkTheme}>
      <SkillsContext.Provider value={{ skills, setSkills }}>
        <Grid container style={{ height: '100vh', overflow: 'hidden' }}>
          <Grid container item xs={1} style={{ height: '100%' }}>
            <Grid item xs={12}>
              <LeftAppBar />
            </Grid>
            <Grid item xs={12} style={{ height: '50%' }}>
              <CustomStyledItem>
                <CommandPrompt />
              </CustomStyledItem>
            </Grid>
          </Grid>

          <Grid item xs={9} style={{ overflowY: 'auto' }}>
            <CustomStyledItem style={{ height: '100%' }}>
              <MainBodyView />
              <ChatWindow />
              {/* <RoomView />
            <MessageHistory />
            <AuthStatus /> */}
            </CustomStyledItem>
          </Grid>
          <Grid item xs={2} style={{ overflowY: 'auto' }}>
            <Grid item xs={12}>
              <RightAppBar />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <MyBottomNavigation />
          </Grid>
        </Grid>
      </SkillsContext.Provider>
    </ThemeProvider>
  );
};

// return (
//   <ThemeProvider theme={darkTheme}>
//     <SkillsContext.Provider value={{ skills, setSkills }}>
//       {' '}
//       <Grid container style={{ height: '100vh', overflow: 'hidden' }}>
//         <Grid container item xs={2} style={{ height: '100%' }}>
//           <Grid item xs={12}>
//             <LeftAppBar />
//           </Grid>
//           <Grid item xs={12} style={{ height: '50%' }}>
//             <CustomStyledItem>
//               <CommandPrompt />
//             </CustomStyledItem>
//           </Grid>
//         </Grid>

//         <Grid item xs={10} style={{ overflowY: 'auto' }}>
//           <CustomStyledItem style={{ height: '100%' }}>
//             <MainBodyView />
//             {/* <RoomView />
//             <MessageHistory />
//             <AuthStatus /> */}
//           </CustomStyledItem>
//         </Grid>

//         <Grid container item xs={12}>
//           <MyBottomNavigation />
//         </Grid>
//       </Grid>
//     </SkillsContext.Provider>{' '}
//   </ThemeProvider>
// );

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Grid container style={{ height: '100vh', overflow: 'hidden' }}>
//         <Grid container item xs={2} style={{ height: '100%' }}>
//           <Grid item xs={12} style={{ height: '50%' }}>
//             <CustomStyledItem>
//               <Portrait />
//               <PromptOutput /> {/* Include the PromptOutput component */}
//               <ActionButtons />
//             </CustomStyledItem>
//           </Grid>
//           <Grid item xs={12} style={{ height: '50%' }}>
//             <CustomStyledItem>
//               <CommandPrompt />
//             </CustomStyledItem>
//           </Grid>
//         </Grid>

//         <Grid item xs={8} style={{ overflowY: 'auto' }}>
//           <CustomStyledItem>
//             <RoomView />
//             <MessageHistory />
//           </CustomStyledItem>
//         </Grid>

//         {/* <Grid container item xs={2} style={{ height: '100%' }}>
//           <Grid item xs={12} style={{ height: '33%' }}>
//             <CustomStyledItem>
//               <EnemyIcon />
//             </CustomStyledItem>
//           </Grid>
//           <Grid item xs={12} style={{ height: '33%' }}>
//             <CustomStyledItem>
//               <Map />
//               <Skills />
//             </CustomStyledItem>
//           </Grid>
//           <Grid item xs={12} style={{ height: '34%' }}>
//             <CustomStyledItem>
//               <WebSocketStatus />
//               <AuthStatus />
//               <CharacterStatus />
//             </CustomStyledItem>
//           </Grid>
//         </Grid> */}

//         <Grid container item xs={12}>
//           {/* ... */}
//           <MyBottomNavigation />
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };
