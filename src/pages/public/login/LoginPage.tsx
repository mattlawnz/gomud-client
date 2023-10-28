import '../../../index.css';

import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Form, Link, useActionData, useLocation, useNavigation } from 'react-router-dom';

export function LoginPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div
      style={{
        backgroundImage: 'url(/images/splash.png)',
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
        <Typography variant="body1">
          Log in to access the game. If you do not have an account, <Link to="/signup">sign up</Link>.
        </Typography>

        <Form method="post" replace>
          <input type="hidden" name="redirectTo" value={from} />

          <Container>
            <TextField fullWidth label="Username" name="username" variant="outlined" margin="dense" />
          </Container>

          <Container>
            <TextField fullWidth label="Password" type="password" name="password" variant="outlined" margin="dense" />
          </Container>

          <Button type="submit" variant="contained" color="primary" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
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
