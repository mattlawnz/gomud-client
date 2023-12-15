import rollupReplace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
// export default defineConfig({
export default defineConfig(({ mode }) => {
  // when running locally, we'll just let the app figure out the current
  // backend and send request to http and websocket on the same host.
  // it should end up sending request to vite proxy
  let fetchBackendUrlHttp = '';
  let fetchBackendUrlWs = '';

  // by default, let the vite proxy send to backend server on 8080
  let proxyTarget = 'http://127.0.0.1:8080';

  // use --mode=proxymmud to proxy to mud server running on the web
  if (mode === 'proxymud') {
    proxyTarget = 'https://mud.mlmc.nz';
  }
  // point to the mud server directly as there will be no proxy
  if (mode === 'production') {
    fetchBackendUrlHttp = 'https://mud.mlmc.nz';
    fetchBackendUrlWs = 'wss://mud.mlmc.nz';
  }

  process.env.VITE_BACKEND_URL_WEBSOCKET = fetchBackendUrlWs;
  process.env.VITE_BACKEND_URL_HTTP = fetchBackendUrlHttp;
  return {
    server: {
      port: 3000,
      proxy: {
        // Using the proxy instance
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
        '/websocket': {
          target: proxyTarget,
          ws: true,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      rollupReplace({
        preventAssignment: true,

        values: {
          __DEV__: JSON.stringify(true),
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
      }),
      react(),
      eslint(),
    ],
    resolve: process.env.USE_SOURCE
      ? {
          alias: {
            '@remix-run/router': path.resolve(__dirname, '../../packages/router/index.ts'),
            'react-router': path.resolve(__dirname, '../../packages/react-router/index.ts'),
            'react-router-dom': path.resolve(__dirname, '../../packages/react-router-dom/index.tsx'),
          },
        }
      : {},
  };
});
