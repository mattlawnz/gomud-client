import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import type { CharacterType } from 'src/types';

import { getSocketURL } from '../../../config';
import { WebSocketComponent } from '../../../websocket';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ECEFF1',
    },
  },
});

export function GamePage() {
  const [themeName, setThemeName] = useState('light');

  const toggleTheme = () => {
    setThemeName((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  useWebSocket(getSocketURL(), {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });

  return (
    <ThemeProvider theme={themeName === 'light' ? lightTheme : darkTheme}>
      <Layout toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

interface LayoutProps {
  toggleTheme: () => void;
}

function Layout({ toggleTheme }: LayoutProps) {
  const character = useLoaderData() as CharacterType;
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>

      <WebSocketComponent character={character} />
    </div>
  );
}
