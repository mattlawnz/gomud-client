import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { authProvider } from '../../../auth';

async function fetchCharacterData(username: string) {
  try {
    const response = await fetch(`https://mud.mlmc.nz/api/users/${username}/characters`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`Got character ${JSON.stringify(data)}`);
      return data;
    } else {
      // Handle HTTP error responses here
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.errorMessage);
    }
  } catch (error) {
    // Handle network errors here
    console.error('Network error:', error);
    throw new Error('Network error occurred');
  }
}

export async function dashboardLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }

  // return redirect('/dashboard/game');
  if (authProvider.username) {
    return await fetchCharacterData(authProvider?.username);
  }
  return null;
}
