import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ActionButtons } from './components/ActionButtons';
import { CommandPrompt } from './components/CommandPrompt';
import { CustomStyledItem } from './components/CustomStyledItem';
import { InputModal } from './components/InputModal';
import { MessageHistory } from './components/MessageHistory';
import { Portrait } from './components/Portrait';
import { PromptOutput } from './components/PromptOutput';
import { RawMessageHistory } from './components/RawMessageHistory';
import { RoomView } from './components/Room';
import { Skills } from './components/Skills';
import { WebSocketStatus } from './components/WebSocketStatus';

// interface WebSocketComponentProps {
//   toggleTheme: () => void;
// }

export const WebSocketComponent = () => {
  const theme = useTheme();

  return (
    // Create the main Grid container for the whole page
    <Grid container spacing={2}>
      {/* Add element for modal so it can be shown for "init" messages */}
      <InputModal />
      <Grid item xs={12}>
        <CustomStyledItem style={{ backgroundColor: theme.palette.background.paper }}>
          {/* Show the status of websocket connection */}
          <WebSocketStatus />
        </CustomStyledItem>
      </Grid>

      <Grid item xs={2}>
        <CustomStyledItem>
          {/* Start of a child grid to container user info and commands, we could be separated into an independent component later on */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomStyledItem>
                {/* Use the portrait element */}
                <Portrait />
              </CustomStyledItem>
            </Grid>
            <Grid item xs={12}>
              <CustomStyledItem>
                {/* Show the prompt for health etc */}
                <PromptOutput />
              </CustomStyledItem>
            </Grid>
            <Grid item xs={12}>
              <CustomStyledItem>
                <CommandPrompt />
              </CustomStyledItem>
            </Grid>
            {/* TODO: Move Grid out of ActionButtons */}
            <ActionButtons />
            <Grid item xs={12}>
              <CustomStyledItem>
                <Skills />
              </CustomStyledItem>
            </Grid>
          </Grid>

          {/* End of the child grid that holds users info and command */}
        </CustomStyledItem>
      </Grid>

      <Grid item xs={8}>
        <CustomStyledItem>
          {/* Show Room element */}
          <RoomView />
          <MessageHistory />
        </CustomStyledItem>
      </Grid>
      <Grid item xs={2}>
        <CustomStyledItem>{/* Show Enemy element, needs to be defined */}</CustomStyledItem>
      </Grid>
      {/* Show messages */}
      <Grid item xs={12}>
        <CustomStyledItem>
          <RawMessageHistory />
        </CustomStyledItem>
      </Grid>
    </Grid>
  );
};
