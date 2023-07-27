import { Form, Link, useActionData, useLocation, useNavigation } from 'react-router-dom';

export function LoginPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>
        Log in to access the game. If you do not have an account, <Link to="/signup">sign up</Link>
      </p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
          Password: <input type="password" name="password" />
        </label>

        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  );
}
