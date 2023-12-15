# React app

Install Yarn 3, follow instructions here https://yarnpkg.com/getting-started/install

## Run the app

Yarn 3 has a zero install feature where all dependencies are committed in the repo as well.
You can just checkout the project and do the following

```bash
cd client-react

# run it locally, proxying to local backend
yarn dev

# run it locally, proxying to live server at mud.mlmc.nz
yarn proxymud
```

If you have to install dependencies in case it complains then run the following

```
yarn install
```

## Access the app

The app starts at http://localhost:3000 for now as port 8080 is already taken by the backend app

## How to develop

Open the `client-react` directory independently in vscode i.e. separately in a new vscode window. This allows react and typescript to work well with vscode. Otherwise, it may complain like the following

```
Cannot find module 'react' or its corresponding type declarations.ts(2307)
```

## Lint

See https://dev.to/marcosdiasdev/adding-eslint-and-prettier-to-a-vitejs-react-project-2kkj on how to integrate with vscode.

Also install `Prettier - Code formatter` plugin in vscode https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Run the following to fix lint issues

```
yarn lint:fix
```

## TODO:

- Find a way to get this working smoothly with vscode along with backend project
- Add more functionality to the app to have all functionality of the current web interface
- Add a linter
- Build app in docker as host via the backend app i.e. replace the current web interface
