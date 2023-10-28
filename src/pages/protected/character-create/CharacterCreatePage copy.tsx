import { MenuItem, Select } from '@mui/material';
import { Form, useActionData, useLocation, useNavigation } from 'react-router-dom';

export function CharacterCreatePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isCreatingCharacter = navigation.formData?.get('select-class') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>Create a character</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Character name: <input name="character-name" />
        </label>
        <Select name="select-class" labelId="select-label-class" id="select-class" label="Class">
          <MenuItem value="mage">Mage</MenuItem>
          <MenuItem value="warrior">Warrior</MenuItem>
        </Select>
        <Select name="select-race" labelId="select-label-race" id="select-race" label="Race">
          <MenuItem value="human">Human</MenuItem>
          <MenuItem value="elf">Elf</MenuItem>
        </Select>

        <button type="submit" disabled={isCreatingCharacter}>
          {isCreatingCharacter ? 'Creating character..' : 'Create character'}
        </button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  );
}
