import { authProvider } from '../../../auth';
import type { CharacterType } from '../../../types';

async function fetchCharacterData(username: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_HTTP}/api/users/${username}/characters`, {
      method: 'GET',
    });

    if (response.ok) {
      // If signin is successful, update the auth provider state
      const data = (await response.json()) as CharacterType[];
      console.log(`Got character ${JSON.stringify(data)}`);
      return data;
    } else {
      const errorData = await response.json();
      console.log(errorData);
      // Handle signin error here
      throw new Error(errorData.errorMessage);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      // Handle any other error that might occur during the API call
      throw new Error('Unknown error during sign up');
    }
  }
  return null;
}

export async function characterCreateLoader() {
  // // If the user is not logged in and tries to access `/protected`, we redirect
  // // them to `/login` with a `from` parameter that allows login to redirect back
  // // to this page upon successful authentication
  // if (!authProvider.isAuthenticated) {
  //   const params = new URLSearchParams();
  //   params.set('from', new URL(request.url).pathname);
  //   return redirect('/login?' + params.toString());
  // }

  if (authProvider.username) {
    return await fetchCharacterData(authProvider.username);
  }
  return null;
}
