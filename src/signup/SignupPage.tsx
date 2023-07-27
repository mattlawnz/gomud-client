import { Form, useActionData, useLocation, useNavigation } from 'react-router-dom';

export function SignupPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isSigningUp = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>Log in to access the game</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
          Password: <input type="password" name="password" />
          ConfirmPassword: <input type="password" name="confirmpassword" />
        </label>

        <button type="submit" disabled={isSigningUp}>
          {isSigningUp ? 'Signing in...' : 'Sign up'}
        </button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  );
}
