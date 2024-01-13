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

const playersOptions = {
  'one-player': [
    {
      id: 0,
      uuid: '54032c53-729b-4418-921e-16e82182935c',
      displayName: 'm_human',
      race: 'Human',
      class: 'Mage',
      level: 1,
      portrait: 'images/human_male_1.png',
      icon: '🧑',
      isFighting: false,
    },
  ],
  'two-players': [
    {
      id: 0,
      uuid: '54032c53-729b-4418-921e-16e82182935c',
      displayName: 'm_human',
      race: 'Human',
      class: 'Mage',
      level: 1,
      portrait: 'images/human_male_1.png',
      icon: '🧑',
      isFighting: false,
    },
    {
      id: 0,
      uuid: '46142114-922a-47c8-a641-6966fe5b7dfc',
      displayName: 't_warrior',
      race: 'Human',
      class: 'Warrior',
      level: 1,
      portrait: 'images/human_male_1.png',
      icon: '🧑',
      isFighting: false,
    },
  ],
};

const monsterDetailsOption = {
  null: null,
  'monster-1-goblin': {
    monsterInstanceID: 1,
    type: 'monsterDetails',
    name: 'Goblin',
    shortDescription: 'A sneaky goblin',
    longDescription: 'This is a small, sneaky goblin with green skin and sharp teeth.',
    health: 90,
    mana: 0,
    icon: 'goblin_male_1.png',
    effects: ['Shield'],
    inventory: null,
    equipment: ['Chest: Leather Chest Piece', 'Legs: Chainmail Leggings', 'MainHand: Wooden Mace'],
    level: 1,
    levelDiff: 0,
    rank: '',
    species: '',
  },
};

const itemDetailsOption = {
  null: null,
  'leather-chest-piece': {
    armorDetails: ' Armor Class: 4 (+4), Wear Slots: [Chest],',
    attributeModifiers: {
      Strength: 1,
    },
    category: 'Armor',
    color: '#909090',
    description: 'A sturdy chest piece made of leather.',
    durability: {
      current: 0,
      max: 100,
    },
    itemID: 7,
    level: 50,
    materials: ['leather'],
    name: 'Leather Chest Piece',
    rarity: 'Trash',
    score: 22,
    statModifiers: {
      Health: 5,
    },
    type: 'itemDetails',
  },
  'chainmail-leggings': {
    armorDetails: ' Armor Class: 3 (+3), Wear Slots: [Legs],',
    attributeModifiers: {
      Strength: 2,
    },
    category: 'Armor',
    color: '#00FF00',
    description: 'Durable leggings made from chainmail and leather.',
    durability: {
      current: 0,
      max: 100,
    },
    itemID: 8,
    level: 10,
    materials: ['copper', 'leather'],
    name: 'Chainmail Leggings',
    rarity: 'Uncommon',
    score: 84,
    statModifiers: {
      Health: 20,
    },
    type: 'itemDetails',
  },
  'wooden-mace': {
    affectDetails:
      'Item Effects:\nEffect Name: Chill\nEffect Description: \nEffect Duration: 50\nEffect Stacks: 1\nEffect Name: Shield\nEffect Description: \nEffect Duration: -1\nEffect Stacks: 1\n',
    attributeModifiers: {
      Strength: 2,
    },
    category: 'Weapon',
    color: '#FFD700',
    description: 'A sturdy mace made from wood and bronze.',
    durability: {
      current: 0,
      max: 100,
    },
    itemID: 9,
    level: 3,
    materials: ['wood', 'bronze'],
    name: 'Wooden Mace',
    rarity: 'Legendary',
    score: 64,
    statModifiers: {
      Health: 15,
    },
    type: 'itemDetails',
    weaponDetails: 'Speed: 1.50 Damage: 8-12 Average(6.67) dps (0.00 dps),',
  },
};

const secondaryViewOptions = {
  null: null,
  playerDetails: 'playerDetails',
  monsterDetails: 'monsterDetails',
  itemDetails: 'itemDetails',
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
    playersData: {
      options: Object.keys(playersOptions),
      mapping: playersOptions,
      control: {
        type: 'select',
      },
    },
    monsterDetailsData: {
      options: Object.keys(monsterDetailsOption),
      mapping: monsterDetailsOption,
      control: {
        type: 'select',
      },
    },
    itemDetailsData: {
      options: Object.keys(itemDetailsOption),
      mapping: itemDetailsOption,
      control: {
        type: 'select',
      },
    },
    secondaryView: {
      options: Object.keys(secondaryViewOptions),
      mapping: secondaryViewOptions,
      control: {
        type: 'select',
      },
    },
  },
  args: {
    // roomData: roomOptions['a-simple-room'],
    // playersData: playersOptions['one-player'],
    // monstersData: monstersOptions['one-monster'],
    // itemData: itemsOptions['one-item'],
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
