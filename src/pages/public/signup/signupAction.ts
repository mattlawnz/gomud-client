import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { authProvider } from '../../../auth';

export async function signupAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;
  const confirmPassword = formData.get('confirmpassword') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: 'You must provide a username to sign up',
    };
  }

  if (!password) {
    return {
      error: 'You must provide a password to sign up',
    };
  }

  if (!confirmPassword) {
    return {
      error: 'You must confirm a password to sign up',
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signup(username, password);
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
        error: 'Unknown error during sign up',
      };
    }
  }

  const redirectTo = formData.get('redirectTo') as string | null;
  return redirect(redirectTo || '/');
}
