import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Box, Button, IconButton } from '@mui/material';
import React from 'react';
import { Link, useFetcher, useRouteLoaderData } from 'react-router-dom';

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
    <React.Fragment>
      <Link to="/dashboard/character-select">
        <IconButton color="secondary">
          <FollowTheSignsIcon />
          Change Character
        </IconButton>
      </Link>

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
    </React.Fragment>
  );
}
