import { Box, Button } from '@mui/material';
import { useFetcher, useRouteLoaderData } from 'react-router-dom';
import type { RouterRootData } from './types';

export function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  const { user } = useRouteLoaderData('root') as RouterRootData;
  const fetcher = useFetcher();

  if (!user) {
    return (
      <Box
        sx={{
          '@media (min-width: 1440px)': {
            fontSize: '26px !important',
          },
          '@media (min-width: 1996px)': {
            fontSize: '30px !important',
          },
        }}
      >
        You are not logged in.
      </Box>
    );
  }

  const isLoggingOut = fetcher.formData != null;

  return (
    <Box>
      <fetcher.Form method="post" action="/logout">
        <Button
          type="submit"
          disabled={isLoggingOut}
          sx={{
            '@media (min-width: 1440px)': {
              fontSize: '26px !important',
            },
            '@media (min-width: 1996px)': {
              fontSize: '30px !important',
            },
          }}
        >
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </fetcher.Form>
      <Box
        sx={{
          '@media (min-width: 1440px)': {
            fontSize: '26px !important',
          },
          '@media (min-width: 1996px)': {
            fontSize: '30px !important',
          },
        }}
      >
        Welcome {user}!
      </Box>
    </Box>
  );
}
