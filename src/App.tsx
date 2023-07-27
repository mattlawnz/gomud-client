import { useEffect } from 'react';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import { authProvider } from './auth';
import { AuthStatus } from './AuthStatus';
import { loginAction } from './login/loginAction';
import { loginLoader } from './login/loginLoader';
import { LoginPage } from './login/LoginPage';
import { protectedLoader } from './protected/protectedLoader';
import { ProtectedPage } from './protected/ProtectedPage';
import { signupAction } from './signup/signupAction';
import { signupLoader } from './signup/signupLoader';
import { SignupPage } from './signup/SignupPage';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      // Initialize the authProvider on the root route
      // This will load the user from local storage if available
      authProvider.initialize();
      // Our root route always provides the user, if logged in
      return { user: authProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        loader: protectedLoader,
        Component: ProtectedPage,
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

  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <Outlet />
    </div>
  );
}
