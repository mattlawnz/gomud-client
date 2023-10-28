import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import type { CharacterType } from '../../../types';
import { characterProvider } from '../characterProvider';

export async function characterSelectAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const selectedcharacter = formData.get('select-character') as string | null;

  // Validate our form inputs and return validation errors via useActionData()

  if (!selectedcharacter) {
    return {
      error: 'You must select a character',
    };
  }

  // Create character and redirect to the proper destination if successful.
  try {
    const parsedSelectedCharacter = JSON.parse(selectedcharacter) as CharacterType;

    await characterProvider.selectCharacter(parsedSelectedCharacter);
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
