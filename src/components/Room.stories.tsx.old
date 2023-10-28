import type { Meta, StoryObj } from '@storybook/react';

import { RoomComponent } from './Room';

const meta: Meta<typeof RoomComponent> = {
  component: RoomComponent,
};

export default meta;
type Story = StoryObj<typeof RoomComponent>;

// Mock data for the Room component.
const mockedRoomData = {
  type: 'some type',
  title: 'Room Title',
  description: 'Room Description',
  exits: {},
  itemNames: ['Item 1', 'Item 2', 'Item 3'],
  monsterDescriptions: [
    {
      monsterInstanceID: 1,
      currentHealthPoints: 100,
      currentManaPoints: 50,
      monsterName: 'Monster 1',
      monsterDescription: 'Description of Monster 1',
      monsterIcon: 'url-to-monster-icon',
      monsterEffects: [],
    },
    {
      monsterInstanceID: 2,
      currentHealthPoints: 150,
      currentManaPoints: 75,
      monsterName: 'Monster 2',
      monsterDescription: 'Description of Monster 2',
      monsterIcon: 'url-to-monster-icon',
      monsterEffects: [],
    },
  ],
};

// This will allow to edit the control data in the Storybook UI.
export const Primary: Story = {
  args: {
    roomData: mockedRoomData,
  },
};
