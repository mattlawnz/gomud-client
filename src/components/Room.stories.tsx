import type { Meta, StoryObj } from '@storybook/react';

import { RoomComponent } from './Room';

const roomOptions = {
  'a-simple-room': {
    type: 'room',
    title: 'Room Title',
    description: 'Room Description',
    exits: {},
    itemNames: [],
    monsterDescriptions: [],
    icon: '',
  },
  'the-large-hall': {
    type: 'room',
    title: 'The large hall',
    description: 'Some type of a large hall that has some description',
    exits: {},
    itemNames: [],
    monsterDescriptions: [],
    icon: '',
  },
  // Add more options as needed...
};

const meta: Meta<typeof RoomComponent> = {
  component: RoomComponent,
  argTypes: {
    roomData: {
      options: Object.keys(roomOptions),
      mapping: roomOptions,
      control: {
        type: 'select',
      },
    },
  },
  args: {
    roomData: roomOptions['a-simple-room'],
    sendCommand: (command: string) => {
      console.log(`sendCommand: ${command}`);
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomComponent>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  // don't need to explicitly mention the render, it will be inferred because of args
  // render: () => <RoomComponent />,
  args: {},
};

export const MultipleCharacters: Story = {
  // don't need to explicitly mention the render, it will be inferred because of args
  // render: () => <RoomComponent />,
  args: {},
};
