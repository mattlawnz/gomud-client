import type { CharacterType } from '../../types';

interface CharacterProvider {
  character: null | CharacterType;
  initialize(): void;
  // eslint-disable-next-line no-unused-vars
  createCharacter(username: string, character: CharacterType): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  selectCharacter(character: CharacterType): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const characterProvider: CharacterProvider = {
  character: null,

  // Initialize the charater state from localStorage on app startup
  initialize() {
    const storedCharacter = localStorage.getItem('character');
    if (storedCharacter) {
      try {
        const parsedCharacter = JSON.parse(storedCharacter) as CharacterType;
        characterProvider.character = parsedCharacter;
      } catch (error) {
        console.error('Error parsing character from localStorage:', error);
      }
    }
  },
  async createCharacter(username: string, character: CharacterType) {
    try {
      const response = await fetch(`https://mud.mlmc.nz/api/users/${username}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });

      if (response.ok) {
        // If signin is successful, update the auth provider state
        await response.json();
        console.log(`Character '${character.displayName}' created successfully`);
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
        throw new Error('Unknown error during character creation');
      }
    }
  },
  async selectCharacter(character: CharacterType) {
    localStorage.setItem('character', JSON.stringify(character));
    characterProvider.character = character;
  },
  async signout() {
    // await new Promise((r) => setTimeout(r, 500)); // fake delay
    characterProvider.character = null;
    localStorage.removeItem('character');
  },
};
