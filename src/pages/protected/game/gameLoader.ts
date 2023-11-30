import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { characterProvider } from '../characterProvider';

// async function fetchCharacterData(username: string) {
//   try {
//     const response = await fetch(`http://localhost:8080/users/${username}/characters`, {
//       method: 'GET',
//     });

//     if (response.ok) {
//       // If signin is successful, update the auth provider state
//       const data = (await response.json()) as CharacterType[];
//       console.log(`Got character ${JSON.stringify(data)}`);
//       return data;
//     } else {
//       const errorData = await response.json();
//       console.log(errorData);
//       // Handle signin error here
//       throw new Error(errorData.errorMessage);
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       throw new Error(err.message);
//     } else {
//       // Handle any other error that might occur during the API call
//       throw new Error('Unknown error during sign up');
//     }
//   }
//   return null;
// }

export async function gameLoader({ request }: LoaderFunctionArgs) {
  // if the user is logged in but does not have a character, redirect to character page
  // where user can create characters and select one
  if (!characterProvider.character) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/dashboard/character-select?' + params.toString());
  }
  return characterProvider.character;
}
