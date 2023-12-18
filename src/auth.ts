interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  initialize(): void;
  // eslint-disable-next-line no-unused-vars
  signup(username: string, password: string): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  signin(username: string, password: string): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,

  // Initialize the auth state from localStorage on app startup
  // TODO: Use a secure token instead of simply storing the username
  initialize() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        authProvider.isAuthenticated = true;
        authProvider.username = parsedUser.username;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  },

  // async signup(username: string, password: string) {
  //   const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'; // default to localhost
  //   try {
  //     const response = await fetch(`${serverUrl}/signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     });
  //     // ...rest of the code
  //   } catch (error) {
  //     console.error("Error during fetch:", error);
  //   }
  // }

  async signup(username: string, password: string) {
    //await new Promise((r) => setTimeout(r, 500)); // fake delay
    //const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';
    try {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // If signin is successful, update the auth provider state
        const data = await response.json();
        console.log(`User ${data.username} created successfully`);
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
        throw new Error('Unknown error during sign up');
      }
    }
  },
  async signin(username: string, password: string) {
    //await new Promise((r) => setTimeout(r, 500)); // fake delay
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // If signin is successful, update the auth provider state
        const data = await response.json();
        authProvider.isAuthenticated = true;
        authProvider.username = data.username;
        localStorage.setItem('user', JSON.stringify({ username }));
      } else {
        // Handle signin error here
        throw new Error('Signin failed');
      }
    } catch (error) {
      // Handle any other error that might occur during the API call
      throw new Error('Error occurred during signin');
    }
  },
  async signout() {
    // await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = '';
    localStorage.removeItem('user');
  },
};
