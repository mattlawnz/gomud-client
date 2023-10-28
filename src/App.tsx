import { useEffect } from 'react';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import { authProvider } from './auth';
// import { AuthStatus } from './AuthStatus';
import { characterCreateAction } from './pages/protected/character-create/characterCreateAction';
import { characterCreateLoader } from './pages/protected/character-create/characterCreateLoader';
import { CharacterCreatePage } from './pages/protected/character-create/CharacterCreatePage';
import { characterSelectAction } from './pages/protected/character-select/characterSelectAction';
import { characterSelectLoader } from './pages/protected/character-select/characterSelectLoader';
import { CharacterSelectPage } from './pages/protected/character-select/CharacterSelectPage';
import { characterProvider } from './pages/protected/characterProvider';
import { dashboardLoader } from './pages/protected/dashboard/dashboardLoader';
import { DashboardPage } from './pages/protected/dashboard/DashboardPage';
// import { fightLoader } from './pages/protected/fight/fightLoader';
import { gameLoader } from './pages/protected/game/gameLoader';
import { GamePage } from './pages/protected/game/GamePage';
import { indexLoader } from './pages/public/index/indexLoader';
import { IndexPage } from './pages/public/index/IndexPage';
import { loginAction } from './pages/public/login/loginAction';
import { loginLoader } from './pages/public/login/loginLoader';
import { LoginPage } from './pages/public/login/LoginPage';
import { signupAction } from './pages/public/signup/signupAction';
import { signupLoader } from './pages/public/signup/signupLoader';
import { SignupPage } from './pages/public/signup/SignupPage';
import type { RouterRootData } from './types';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      // Initialize the authProvider on the root route
      // This will load the user from local storage if available
      authProvider.initialize();
      characterProvider.initialize();
      // Our root route always provides the user, if logged in
      return { user: authProvider.username, character: characterProvider.character } as RouterRootData;
    },
    Component: Layout,
    children: [
      {
        index: true,
        loader: indexLoader,
        Component: IndexPage,
      },
      {
        path: 'dashboard',
        loader: dashboardLoader,
        Component: DashboardPage,
        children: [
          {
            index: true,
            loader: gameLoader,
            Component: GamePage,
          },
          // {
          //   path: 'fight', // New Fight Page Path
          //   loader: fightLoader, // You will need to create this loader
          //   Component: FightPage, // You will need to create this component
          // },
          {
            path: 'character-select',
            loader: characterSelectLoader,
            Component: CharacterSelectPage,
            action: characterSelectAction,
          },
          {
            path: 'character-create',
            loader: characterCreateLoader,
            Component: CharacterCreatePage,
            action: characterCreateAction,
          },
        ],
      },

      {
        path: 'login',
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: 'signup',
        action: signupAction,
        loader: signupLoader,
        Component: SignupPage,
      },
    ],
  },
  {
    path: '/logout',
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await characterProvider.signout();
      await authProvider.signout();
      return redirect('/');
    },
  },
]);

export default function App() {
  // On app mount, check if the user is already logged in and set it in the authProvider
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        authProvider.isAuthenticated = true;
        authProvider.username = parsedUser.username;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);
  useEffect(() => {
    const character = localStorage.getItem('character');
    if (character) {
      try {
        const parsedCharacter = JSON.parse(character);
        characterProvider.character = parsedCharacter;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}

function Layout() {
  return (
    <div>
      {/* <AuthStatus /> */}
      <Outlet />
    </div>
  );
}
