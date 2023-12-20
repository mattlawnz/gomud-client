import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLocation, useNavigation } from 'react-router-dom';

export function SignupPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isSigningUp = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

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
        <Typography variant="body1">Create a NEW account:</Typography>

        <Form method="post" replace>
          <input type="hidden" name="redirectTo" value={from} />

          <Container>
            <TextField fullWidth label="Username" name="username" variant="outlined" margin="dense" />
          </Container>

          <Container>
            <TextField fullWidth label="Password" type="password" name="password" variant="outlined" margin="dense" />
          </Container>

          <Container>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmpassword"
              variant="outlined"
              margin="dense"
            />
          </Container>

          <Button type="submit" variant="contained" color="primary" disabled={isSigningUp}>
            {isSigningUp ? 'Signing in...' : 'Sign up'}
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
