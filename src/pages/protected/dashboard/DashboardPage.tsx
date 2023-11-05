import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

import { getSocketURL } from '../../../config';
// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#90caf9',
//     },
//     secondary: {
//       main: '#ff4081',
//     },
//     background: {
//       default: '#303030',
//       paper: '#424242',
//     },
//     text: {
//       primary: '#ECEFF1',
//     },
//   },
// });

export function DashboardPage() {
  const [themeName, setThemeName] = useState('light');

  const toggleTheme = () => {
    setThemeName((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  useWebSocket(getSocketURL(), {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });

  return <Layout toggleTheme={toggleTheme} />;
}

// interface LayoutProps {
//   toggleTheme: () => void;
// }

function Layout({ toggleTheme }) {
  const [character, setCharacter] = useState({} as CharacterType);

  const characterData = useLoaderData() as UserCharacterData;
  const characters = characterData?.characters;
  // const onCharacterChange = (character: Character) => {
  //   setCharacter(character);
  // };

  const onCharacterChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const index = characters?.map((character) => character.name).indexOf(event.target.value as string);
    setCharacter(characters[index]);
    props.onCharacterChange(props.characters[index]);
  };

  return (
    <div>
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      {/* <CharacterComponent characters={characters} onCharacterChange={onCharacterChange} selectedCharacter={character} /> */}
      {/* <WebSocketComponent character={character} /> */}
      {/* <CharacterStatus /> */}
      <Outlet />
    </div>
  );
}
