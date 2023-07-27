import { redirect } from 'react-router-dom';

import { authProvider } from '../auth';

export async function signupLoader() {
  if (authProvider.isAuthenticated) {
    return redirect('/');
  }
  return null;
}
