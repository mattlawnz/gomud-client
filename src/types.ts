export type ServerResponse = {
  type: string;
  message: string;
};

export type ClientResponse = {
  type: string;
  response: string;
};

export type ClientCommand = {
  type: 'command';
  command: string;
};

// export const sendCommand = (sendJsonMessage) => (commandValue: string) => {
//   const messageForServer: ClientCommand = {
//     type: 'command',
//     command: commandValue,
//   };
//   sendJsonMessage(messageForServer);
// };
