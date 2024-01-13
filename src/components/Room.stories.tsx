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

const monstersOptions = {
  'one-monster': [
    {
      monsterInstanceID: 1,
      currentHealthPoints: 90,
      currentManaPoints: 0,
      monsterName: 'Goblin',
      shortDescription: 'A sneaky goblin',
      longDescription: 'This is a small, sneaky goblin with green skin and sharp teeth.',
      monsterIcon: 'goblin_male_1.png',
      monsterEffects: [],
      inventory: null,
      level: 0,
      levelDiff: 0,
      rank: '',
      race: '',
      species: '',
      isFighting: false,
    },
  ],
  'two-monsters': [
    {
      monsterInstanceID: 1,
      currentHealthPoints: 90,
      currentManaPoints: 0,
      monsterName: 'Goblin',
      shortDescription: 'A sneaky goblin',
      longDescription: 'This is a small, sneaky goblin with green skin and sharp teeth.',
      monsterIcon: 'goblin_male_1.png',
      monsterEffects: [
        {
          name: 'Shield',
          adjective: '',
          description: '',
          type: 0,
          duration: -1000000000,
          applicationTime: '2024-01-13T19:50:20.897213317+13:00',
          power: 0,
          stacks: 1,
          affectedStat: {},
          affectedSkills: null,
          affectedAttributes: {},
          msgOnApply: '',
          msgOnExpire: '',
          msgOnTick: '',
        },
      ],
      inventory: null,
      level: 0,
      levelDiff: 0,
      rank: '',
      race: '',
      species: '',
      isFighting: false,
    },
    {
      monsterInstanceID: 2,
      currentHealthPoints: 80,
      currentManaPoints: 0,
      monsterName: 'Goblin',
      shortDescription: 'A sneaky goblin',
      longDescription: 'This is a small, sneaky goblin with green skin and sharp teeth.',
      monsterIcon: 'goblin_male_1.png',
      monsterEffects: [],
      inventory: null,
      level: 0,
      levelDiff: 0,
      rank: '',
      race: '',
      species: '',
      isFighting: false,
    },
  ],
  // Add more options as needed...
};

const itemsOptions = {
  'one-item': [
    {
      itemInstanceID: 7,
      itemName: 'Leather Chest Piece',
      itemDescription: 'A sturdy chest piece made of leather.',
      itemIcon: '',
      itemLevel: 50,
      itemEffects: null,
      itemScore: 22,
      itemRarity: 'Trash',
      itemType: '',
      itemColor: '#909090',
    },
  ],
  'two-items': [
    {
      itemInstanceID: 7,
      itemName: 'Leather Chest Piece',
      itemDescription: 'A sturdy chest piece made of leather.',
      itemIcon: '',
      itemLevel: 50,
      itemEffects: null,
      itemScore: 22,
      itemRarity: 'Trash',
      itemType: '',
      itemColor: '#909090',
    },
    {
      itemInstanceID: 8,
      itemName: 'Chainmail Leggings',
      itemDescription: 'Durable leggings made from chainmail and leather.',
      itemIcon: '',
      itemLevel: 10,
      itemEffects: null,
      itemScore: 84,
      itemRarity: 'Uncommon',
      itemType: '',
      itemColor: '#00FF00',
    },
  ],
  'three-item': [
    {
      itemInstanceID: 7,
      itemName: 'Leather Chest Piece',
      itemDescription: 'A sturdy chest piece made of leather.',
      itemIcon: '',
      itemLevel: 50,
      itemEffects: null,
      itemScore: 22,
      itemRarity: 'Trash',
      itemType: '',
      itemColor: '#909090',
    },
    {
      itemInstanceID: 8,
      itemName: 'Chainmail Leggings',
      itemDescription: 'Durable leggings made from chainmail and leather.',
      itemIcon: '',
      itemLevel: 10,
      itemEffects: null,
      itemScore: 84,
      itemRarity: 'Uncommon',
      itemType: '',
      itemColor: '#00FF00',
    },
    {
      itemInstanceID: 9,
      itemName: 'Wooden Mace',
      itemDescription: 'A sturdy mace made from wood and bronze.',
      itemIcon: '',
      itemLevel: 3,
      itemEffects: null,
      itemScore: 64,
      itemRarity: 'Legendary',
      itemType: '',
      itemColor: '#FFD700',
    },
  ],
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
    monstersData: {
      options: Object.keys(monstersOptions),
      mapping: monstersOptions,
      control: {
        type: 'select',
      },
    },
    itemsData: {
      options: Object.keys(itemsOptions),
      mapping: itemsOptions,
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
