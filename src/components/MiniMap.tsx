import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import { getSocketURL } from '../config';
import type { ServerResponse, UpdateMapType } from '../types';

function hasExitTo(updateMapData: UpdateMapType, fromId: number, toId: number | undefined): boolean {
  const fromRoom = updateMapData.mini_map.find((room) => room.id === fromId);
  if (!toId) {
    return false;
  }

  const toRoom = updateMapData.mini_map.find((room) => room.id === toId);

  if (!fromRoom || !toRoom || !fromRoom.exits) {
    return false;
  }

  if (fromRoom.x === toRoom.x) {
    if (fromRoom.y === toRoom.y + 1) {
      return fromRoom.exits.south === true;
    }
    if (fromRoom.y === toRoom.y - 1) {
      return fromRoom.exits.north === true;
    }
  }

  if (fromRoom.y === toRoom.y) {
    if (fromRoom.x === toRoom.x + 1) {
      return fromRoom.exits.west === true;
    }
    if (fromRoom.x === toRoom.x - 1) {
      return fromRoom.exits.east === true;
    }
  }

  if (fromRoom.z === toRoom.z) {
    if (fromRoom.z === toRoom.z + 1) {
      return fromRoom.exits.down === true;
    }
    if (fromRoom.z === toRoom.z - 1) {
      return fromRoom.exits.up === true;
    }
  }

  return false;
}

export const MiniMap: React.FC = () => {
  const [map, setMap] = React.useState<Map<string, UpdateMapType['mini_map'][0]>>(new Map());
  const [currentRoom, setCurrentRoom] = React.useState<UpdateMapType['current_room'] | null>(null);
  const [data, setData] = React.useState<UpdateMapType | null>(null);
  const { lastJsonMessage } = useWebSocket(getSocketURL(), {
    share: true,
    filter(message: WebSocketEventMap['message']) {
      const serverResponse = JSON.parse(message.data) as ServerResponse;
      return serverResponse.type === 'updateMap';
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      const serverResponse = lastJsonMessage as unknown as ServerResponse;
      const data: UpdateMapType = JSON.parse(serverResponse.message);

      setCurrentRoom(data.current_room);

      const val1 = data.current_room;
      const val2 = data.mini_map;
      // log the values
      console.log(val1, val2);
      const newMap = new Map<string, UpdateMapType['mini_map'][0]>();
      data.mini_map.forEach((room) => {
        if (room.z === data.current_room.z) {
          newMap.set(`${room.x},${room.y}`, room);
        }
      });

      setMap(newMap);
      setData(data);
      //      }
    }
  }, [lastJsonMessage]);

  // Define the bounds of the mini-map
  // const xMin = map.size ? Math.min(...Array.from(map.values()).map((r) => r.x)) : 0;
  // const xMax = map.size ? Math.max(...Array.from(map.values()).map((r) => r.x)) : 0;
  // const yMin = map.size ? Math.min(...Array.from(map.values()).map((r) => r.y)) : 0;
  // const yMax = map.size ? Math.max(...Array.from(map.values()).map((r) => r.y)) : 0;

  // Fixed dimensions for the 5x5 grid
  const fixedXMin = -2;
  const fixedXMax = 2;
  const fixedYMin = -2;
  const fixedYMax = 2;

  const rows = [];

  // Generate grid
  for (let y = fixedYMax; y >= fixedYMin; y--) {
    const cells = [];
    for (let x = fixedXMin; x <= fixedXMax; x++) {
      const room = map.get(`${x},${y}`);
      let cellClass = 'empty';
      let wallClass = '';
      let newAreaClass = ''; // added this variable to hold the new area class

      if (room) {
        // If this room is part of a different area, add the class for it
        newAreaClass = room.isDifferentArea ? ' new-area' : '';
        if (currentRoom && room.id === currentRoom.id) {
          cellClass = 'current';
        } else {
          cellClass = 'room';
        }

        // Check for walls (non-adjacent rooms)
        if (room.exits && data && map) {
          if (!map.get(`${x + 1},${y}`) || !hasExitTo(data, room.id, map.get(`${x + 1},${y}`)?.id)) {
            wallClass += ' right-wall';
          }
          if (!map.get(`${x - 1},${y}`) || !hasExitTo(data, room.id, map.get(`${x - 1},${y}`)?.id)) {
            wallClass += ' left-wall';
          }
          if (!map.get(`${x},${y + 1}`) || !hasExitTo(data, room.id, map.get(`${x},${y + 1}`)?.id)) {
            wallClass += ' top-wall';
          }
          if (!map.get(`${x},${y - 1}`) || !hasExitTo(data, room.id, map.get(`${x},${y - 1}`)?.id)) {
            wallClass += ' bottom-wall';
          }
        }
      }

      let upArrow = null;
      let downArrow = null;

      if (room && room.exits) {
        if (room.exits.up) {
          upArrow = <span className="up-arrow">↑</span>;
        }
        if (room.exits.down) {
          downArrow = <span className="down-arrow">↓</span>;
        }
      }
      cells.push(
        <div key={`${x},${y}`} className={`cell ${cellClass}${wallClass}${newAreaClass}`}>
          {upArrow}
          {downArrow}
        </div>,
      );
    }
    rows.push(
      <div key={y} className="row">
        {cells}
      </div>,
    );
  }
  return <div className="miniMap">{rows}</div>;
};
