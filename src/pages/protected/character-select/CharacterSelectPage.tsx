import { Button, Container, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Form, Link, useActionData, useLoaderData, useLocation, useNavigation } from 'react-router-dom';

import type { UserCharacterData } from '../../../types';

export function CharacterSelectPage() {
  return <Layout />;
}

function Layout() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isSelectingCharacter = navigation.formData?.get('select-character') != null;

  const actionData = useActionData() as { error: string } | undefined;

  const characterData = useLoaderData() as UserCharacterData;

  if (!characterData || !characterData.characters || characterData.characters.length === 0) {
    return (
      <div>
        No Character available,{' '}
        <Link to="/dashboard/character-create?from=/dashboard/character-select">Create Character</Link>
      </div>
    );
  }

  const characters = characterData.characters;

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/images/splash.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-text)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          padding: 2,
          borderRadius: 1,
          width: 300,
          textAlign: 'center',
        }}
      >
        <Link to="/dashboard/character-create?from=/dashboard/character-select">Create Character</Link>

        <Form method="post" replace>
          <input type="hidden" name="redirectTo" value={from} />

          <Container>
            <InputLabel id="select-label">Character</InputLabel>
            <Select
              labelId="select-character-label"
              name="select-character"
              id="select-character"
              label="Character"
              variant="outlined"
              margin="dense"
              fullWidth
            >
              {characters.map((character, index) => (
                <MenuItem key={index} value={JSON.stringify(character)}>
                  {character.displayName}
                </MenuItem>
              ))}
            </Select>
          </Container>

          <Button type="submit" variant="contained" color="primary" disabled={isSelectingCharacter}>
            {isSelectingCharacter ? 'Selecting character..' : 'Select character'}
          </Button>

          {actionData && actionData.error ? (
            <Typography variant="body2" color="error">
              {actionData.error}
            </Typography>
          ) : null}
        </Form>
      </Paper>
    </div>
  );
}
