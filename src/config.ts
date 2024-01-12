// export function getSocketURL() {
//   return 'ws://localhost:8080/websocket';
// }

export function getSocketURL() {
  // this will be replace by vite during serve and build with the right value
  //const backendUrlWebsocket = '__BACKEND_URL_WEBSOCKET__';
  const backendUrlWebsocket = import.meta.env.VITE_BACKEND_URL_WEBSOCKET;
  if (backendUrlWebsocket) {
    return `${backendUrlWebsocket}/websocket`;
  }
  // if the value is not provided, we will fall back to the current host
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  // console.log(`Using ${protocol}//${host}/websocket`);
  return `${protocol}//${host}/websocket`;
}
