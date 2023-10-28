import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import type { CharacterType } from 'src/types';

import { authProvider } from '../../../auth';
import { characterProvider } from '../characterProvider';

export async function characterCreateAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const characterName = formData.get('character-name') as string | null;
  const selectedClass = formData.get('select-class') as string | null;
  const selectedRace = formData.get('select-race') as string | null;

  // Validate our form inputs and return validation errors via useActionData()

  if (!characterName) {
    return {
      error: 'You must provide a character name',
    };
  }

  if (!selectedClass) {
    return {
      error: 'You must select a class',
    };
  }

  if (!selectedRace) {
    return {
      error: 'You must select a race',
    };
  }

  // Create character and redirect to the proper destination if successful.
  try {
    const username = authProvider!.username!;
    const character: CharacterType = {
      displayName: characterName,
      className: selectedClass,
      raceName: selectedRace,
    };
    await characterProvider.createCharacter(username, character);
  } catch (err) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    } else {
      return {
        error: 'Unknown error during character creation',
      };
    }
  }

  const redirectTo = formData.get('redirectTo') as string | null;
  return redirect(redirectTo || '/');
}
