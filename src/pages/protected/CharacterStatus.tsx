import { Link, useRouteLoaderData } from 'react-router-dom';

import type { CharacterType } from '../../types';

export function CharacterStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  const { character } = useRouteLoaderData('root') as { character: CharacterType | null };

  if (!character) {
    return <p>You do not have a character selected.</p>;
  }

  return (
    <div>
      <Link to="/dashboard/character-select">Select Character</Link>
      <p>Character {JSON.stringify(character)}</p>
    </div>
  );
}
