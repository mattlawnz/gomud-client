// export function getSocketURL() {
//   return 'ws://localhost:8080/websocket';
// }

export function getSocketURL() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host}/websocket`;
}
