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

export type CharacterType = {
  name?: string;
  uuid?: string;
  displayName: string;
  className?: string;
  raceName?: string;
};

export type UserCharacterData = {
  username: string;
  characters: CharacterType[];
};

export type RouterRootData = {
  user: string | null;
  character: string | null;
};

export type ExitsResponse = {
  type: 'exits';
  exits: { [direction: string]: string };
};

export type ItemType = {
  itemInstanceID: number;
  itemName: string;
  itemDescription: string;
  itemIcon: string;
  itemLevel: number;
  itemEffects: { [key: string]: number };
  itemScore: number;
  itemRarity: string;
  itemType: string;
  itemColor: string;
};

//{"consumableType":"Drust","consumableName":"Glimspores of Drust","consumableDescription":"","consumableQuantity":1,"consumableIcon":"","consumableCooldown":0,"consumableEffects":null}]}

export type ConsumableType = {
  consumableType: string;
  consumableName: string;
  consumableDescription: string;
  consumableQuantity: number;
  consumableIcon: string;
  consumableCooldown: number;
  consumableEffects: { [key: string]: number };
};

export type ConsumablesInRoomResponse = {
  type: 'consumables';
  consumables: ConsumableType[]; // Matching the correct field name
};

export type ItemsInRoomResponse = {
  type: 'itemsinroom';
  itemNames: ItemType[];
};

export type MonsterEffectType = {
  name: string;
  adjective: string;
  description: string;
  type: number;
  duration: number;
  power: number;
  stacks: number;
  //affectedStat: {},
  msgOnApply: string;
  msgOnExpire: string;
  msgOnTick: string;
};

// I think this should really be MonsterInRoom
export type MonsterType = {
  monsterInstanceID: number;
  monsterName: string;
  shortDescription: string;
  longDescription: string;
  currentHealthPoints: number;
  monsterIcon: string;
  monsterEffects: { [key: string]: number };
  inventory: { [key: string]: number };
};

export type MonstersInRoomResponse = {
  type: 'monstersinroom';
  monsterDescriptions: MonsterType[];
};

//////////////////////////////////////////
// This is when you look - the monster Detail
export type MonsterDetail = {
  monsterInstanceID: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  health: number;
  mana: number;
  icon: string;
  effects: string[];
  inventory: string[];
  equipment: string[];
  level: number;
  levelDiff: number;
  rank: number;
  race: string;
  species: string;
  isFighting: boolean;
};
// related to above
export type MonsterDetailResponse = {
  type: 'monsterDetails';
  monsterDetails: MonsterDetail[];
};
//////////////////////////
//{"participants":[{"damage":40,"dps":9,"id":0,"isAlive":true,"name":"drust1","side":"side1"}],"type":"fightSummary"}

export type FightSummary = {
  participants: {
    damage: number;
    dps: number;
    id: number;
    isAlive: boolean;
    name: string;
    side: string;
  }[];
  type: string;
};

// export type FightSummaryResponse = {
//   type: 'fightSummary';
//   fightSummary: FightSummary;
// };

export type FightSummaryResponse = FightSummary;
////////////////////////////////////////////////////////
// {message: '{"Health":100005,"MaxHealth":100000,"DrustCD":10,"DrustCurrentAmount":0}', type: 'prompt'}
export type Prompt = {
  Health: number;
  MaxHealth: number;
  DrustCD: number;
  DrustCurrentAmount: number;
};

export type PromptResponse = {
  type: 'prompt';
  message: string; // Since the message is a stringified JSON
};

////////////////////////////////
//{"message":"{\"uuid\":\"f1e9bf42-4f70-49eb-8a38-d371540e9db6\",\"level\":1,\"experience\":0,\"race\":\"Elf\",\"class\":\"Mage\",\"attributes\":{\"strength\":14,\"dexterity\":13,\"constitution\":13,\"wisdom\":13,\"intellect\":13,\"charisma\":13,\"luck\":13},\"stats\":{\"maxHealth\":100000,\"health\":100005,\"mana\":100000,\"movement\":100000},\"active_effects\":\"No active effects.\\n\",\"item_effects\":\"\\nSteel Sword provides\\nA 1% chance of triggering The following every 0 seconds.\\nTriggerCondition: OnHit\\nRank: 0\\nEffect Name: Chill\\nEffect Description: \\n\"}","type":"score"}
export type Score = {
  uuid: string;
  level: number;
  experience: number;
  race: string;
  class: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    wisdom: number;
    intellect: number;
    charisma: number;
    luck: number;
  };
  stats: {
    maxHealth: number;
    health: number;
    mana: number;
    movement: number;
  };
  active_effects: string | null;
  item_effects: string | null;
};

export type ScoreResponse = {
  type: 'score';
  message: string; // Since the message is a stringified JSON
};

/////////////////////////////////////////////////
/// {"armorDetails":" Armor Class: 4 (+4), Wear Slots: [Chest],","attributeModifiers":{"Strength":1},"category":"Armor","color":"#909090","description":"A sturdy chest piece made of leather.","durability":{"current":0,"max":100},"level":50,"materials":["leather"],"name":"Leather Chest Piece","rarity":"Trash","score":22,"statModifiers":{"Health":5},"type":"itemDetails"} // This is the response from the server

// /// {
//     "armorDetails": " Armor Class: 4 (+4), Wear Slots: [Chest],",
//     "attributeModifiers": {
//         "Strength": 1
//     },
//     "category": "Armor",
//     "color": "#909090",
//     "description": "A sturdy chest piece made of leather.",
//     "durability": {
//         "current": 0,
//         "max": 100
//     },
//     "itemID": 7,
//     "level": 50,
//     "materials": [
//         "leather"
//     ],
//     "name": "Leather Chest Piece",
//     "rarity": "Trash",
//     "score": 22,
//     "statModifiers": {
//         "Health": 5
//     },
//     "type": "itemDetails"
// }

export type ItemDetails = {
  itemID: number;
  armorDetails?: string;
  weaponDetails?: string;
  attributeModifiers?: { [key: string]: number };
  category?: string;
  color: string;
  description: string;
  durability?: { current: number; max: number };
  level?: number;
  materials?: string[];
  name: string;
  rarity: string;
  score: number;
  statModifiers: { [key: string]: number };
  type: string;
};

export type ItemDetailsResponse = {
  type: 'itemDetails';
  itemDetails: ItemDetails;
};

//////////////////////////////////////
// {"equippedItems":[{"empty":true,"slot":"Head"},{"empty":true,"slot":"Shoulders"},{"empty":true,"slot":"Chest"},{"empty":true,"slot":"Waist"},{"empty":true,"slot":"Arms"},{"empty":true,"slot":"Legs"},{"empty":true,"slot":"Hands"},{"empty":true,"slot":"Feet"},{"empty":true,"slot":"Finger1"},{"empty":true,"slot":"Finger2"},{"empty":true,"slot":"Neck"},{"empty":true,"slot":"Back"},{"empty":true,"slot":"Wrist1"},{"empty":true,"slot":"Wrist2"},{"itemDescription":"A sturdy steel sword","itemInstanceID":6,"itemLevel":3,"itemName":"Steel Sword","itemRarity":"Trash","itemScore":22,"slot":"MainHand"},{"empty":true,"slot":"OffHand"}],"type":"equipment"}
export type EquipmentSlot = {
  empty: boolean;
  slot: string;
  itemInstanceID?: number;
  itemName?: string;
  itemDescription?: string;
  itemLevel?: number;
  itemRarity?: string;
  itemScore?: number;
  itemEffects?: { [key: string]: number };
  itemIcon?: string;
  itemType?: string;
  itemColor?: string;
};

// export type ItemType = {
//   itemInstanceID: number;
//   itemName: string;
//   itemDescription: string;
//   itemIcon: string;
//   itemLevel: number;
//   itemEffects: { [key: string]: number };
//   itemScore: number;
//   itemRarity: string;
//   itemType: string;
//   itemColor: string;
// };

export type Equipment = {
  equippedItems: EquipmentSlot[];
  type: 'equipment';
};

export type EquipmentResponse = {
  type: 'equipment';
  message: string;
};

////////////////////////////////
// // {
//     "message": "{\"items\":[{\"category\":\"Weapon\",\"color\":\"#FFD700\",\"description\":\"A sturdy mace made from wood and bronze.\",\"itemID\":5,\"itemName\":\"Wooden Mace\",\"level\":3,\"materials\":[\"wood\",\"bronze\"],\"rarity\":\"Legendary\",\"score\":64},{\"category\":\"Weapon\",\"color\":\"#909090\",\"description\":\"A sturdy steel sword\",\"itemID\":6,\"itemName\":\"Steel Sword\",\"level\":3,\"materials\":[\"steel\",\"ivory\"],\"rarity\":\"Trash\",\"score\":22},{\"category\":\"Armor\",\"color\":\"#909090\",\"description\":\"A sturdy chest piece made of leather.\",\"itemID\":3,\"itemName\":\"Leather Chest Piece\",\"level\":50,\"materials\":[\"leather\"],\"rarity\":\"Trash\",\"score\":22},{\"category\":\"Armor\",\"color\":\"#00FF00\",\"description\":\"Durable leggings made from chainmail and leather.\",\"itemID\":4,\"itemName\":\"Chainmail Leggings\",\"level\":10,\"materials\":[\"chainmail\",\"leather\"],\"rarity\":\"Uncommon\",\"score\":84}],\"type\":\"inventory\"}",
//     "type": "inventory"
// }
export type Inventory = {
  items: ItemType[];
  type: 'inventory';
};

// {     "message": "You slice a wild dog for 11 damage using Steel Sword.",     "type": "fight" }
export type Fight = {
  message: string;
  type: string;
};

export type InventoryResponse = {
  type: 'inventory';
  message: string;
};

export type RoomType = {
  type: string;
  title: string;
  description: string;
  exits: {
    east?: string;
    west?: string;
    north?: string;
    south?: string;
    up?: string;
    down?: string;
  };
  itemNames: string[];
  monsterDescriptions: MonsterType[];
  icon: string;
};

export type Enhancement = {
  CurrentLevel: number;
  Description: string;
  Name: string;
};

//{
//     "message": "[{\"CurrentLevel\":2,\"Description\":\"The basic offensive spell for mages, hurling a shard of ice at the enemy.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the critical hit chance of Icebolt.\",\"Name\":\"Iceshards\"},{\"CurrentLevel\":0,\"Description\":\"Adds a slowing effect to the target hit by Icebolt.\",\"Name\":\"Frostbite\"}],\"IsAvailable\":true,\"Name\":\"Icebolt\",\"Tier\":1},{\"CurrentLevel\":0,\"Description\":\"Unleashes a bolt of fire towards a single enemy.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the power of your Flame Bolt, causing it to deal more damage.\",\"Name\":\"Incineration\"},{\"CurrentLevel\":0,\"Description\":\"Your Fireball adds a damage over time element to the attack.\",\"Name\":\"Conflagration\"}],\"IsAvailable\":true,\"Name\":\"Fireball\",\"Tier\":1},{\"CurrentLevel\":0,\"Description\":\"Unleashes a powerful force blast of pure fire\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Provides a chance to knock the ememy over.\",\"Name\":\"Flame Buffet\"},{\"CurrentLevel\":0,\"Description\":\"Adds extra potency to your attack\",\"Name\":\"Scorching Blast\"}],\"IsAvailable\":false,\"Name\":\"Fblast\",\"Tier\":2},{\"CurrentLevel\":0,\"Description\":\"Razor sharp shard of ice launched at the target\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Provides a Critical hit if the target is stunned.\",\"Name\":\"Deep Freeze\"},{\"CurrentLevel\":0,\"Description\":\"Increases the damage dealt by Frost Nova.\",\"Name\":\"Shatter\"}],\"IsAvailable\":false,\"Name\":\"Iceshard\",\"Tier\":2},{\"CurrentLevel\":0,\"Description\":\"A protective frost barrier that absorbs some damage.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the amount of damage Mana Shield can absorb.\",\"Name\":\"Hardened Aegis\"},{\"CurrentLevel\":0,\"Description\":\"Heals you for a portion of the damage absorbed.\",\"Name\":\"Regenerative Aegis\"}],\"IsAvailable\":false,\"Name\":\"Aegis\",\"Tier\":3},{\"CurrentLevel\":0,\"Description\":\"Creates a vortex of fire at a targeted location, pulling and damaging enemies.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the damage of the attacks\",\"Name\":\"Infernal Pull\"},{\"CurrentLevel\":0,\"Description\":\"Your Flame Vortex lasts longer and causes enemies to take more fire damage.\",\"Name\":\"Smoldering Vortex\"}],\"IsAvailable\":false,\"Name\":\"Fvortex\",\"Tier\":4},{\"CurrentLevel\":0,\"Description\":\"Summons an ice elemental to aid in combat.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the Elemental's hit points and damage.\",\"Name\":\"Empowered Elemental\"},{\"CurrentLevel\":0,\"Description\":\"TODO\",\"Name\":\"Frost Armor\"}],\"IsAvailable\":false,\"Name\":\"Elemental\",\"Tier\":4},{\"CurrentLevel\":0,\"Description\":\"Envelops you in a shield of fire.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Reflects Damage back on incoming effects\",\"Name\":\"Blazing Barrier\"},{\"CurrentLevel\":0,\"Description\":\"Your Fire Shield absorbs more incoming damage.\",\"Name\":\"Flame Absorption\"}],\"IsAvailable\":false,\"Name\":\"Fshield\",\"Tier\":3},{\"CurrentLevel\":0,\"Description\":\"A powerful area-of-effect spell that rains down shards of ice on enemies, causing significant damage.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the damage of Blizzard.\",\"Name\":\"Hailstorm\"},{\"CurrentLevel\":0,\"Description\":\"Blizzard now also blinds enemies, decreasing their hit chance.\",\"Name\":\"Whiteout\"}],\"IsAvailable\":false,\"Name\":\"Blizzard\",\"Tier\":5},{\"CurrentLevel\":0,\"Description\":\"Calls down a meteor from the sky, dealing massive damage to enemies at the targeted location.\",\"Enhancements\":[{\"CurrentLevel\":0,\"Description\":\"Increases the frequency.\",\"Name\":\"Meteor Shower\"},{\"CurrentLevel\":0,\"Description\":\"Increases the power of your Meteor Strike, causing it to deal devastating damage.\",\"Name\":\"Cataclysm\"}],\"IsAvailable\":false,\"Name\":\"Mstrike\",\"Tier\":5}]",
//     "type": "skilltree"
// }

export type SkillTree = {
  CurrentLevel: number;
  Description: string;
  Enhancements: Enhancement[];
  IsAvailable: boolean;
  Name: string;
  Tier: number;
};

export type SkillTreeResponse = {
  type: 'skilltree';
  skills?: SkillTree[];
  message?: string;
};

// {
//     "skills": [
//         {
//             "cooldown": 4000000000,
//             "currentLevel": 3,
//             "enhancements": [
//                 {
//                     "level": 1,
//                     "name": "Iceshards"
//                 },
//                 {
//                     "level": 0,
//                     "name": "Frostbite"
//                 }
//             ],
//             "name": "Icebolt"
//         }
//     ],
//     "type": "skills"
// }

export type Skill = {
  cooldown: number;
  currentLevel: number;
  enhancements: Enhancement[];
  name: string;
  lastUsed: number;
  buttonText: string;
  isAvailable: boolean;
};

export type SkillData = {
  type: string;
  skills: Skill[];
};

// // type CharacterToClient struct {
// 	ID          int    `json:"id"`
// 	DisplayName string `json:"displayName"`
// 	Race        string `json:"race"`
// 	Class       string `json:"class"`
// 	Level       int    `json:"level"`
// 	Portrait    string `json:"portrait,omitempty"`
// 	Icon        string `json:"icon,omitempty"`
// Position    string `json:"position,omitempty"`
// Suffix      string `json:"suffix,omitempty"`
// Prefix      string `json:"prefix,omitempty"`
// IsFighting  bool   `json:"isFighting"`
// }

export type CharacterList = {
  id: number;
  uuid: string;
  displayName: string;
  race: string;
  class: string;
  level: number;
  portrait: string;
  icon: string;
  position: string;
  suffix: string;
  prefix: string;
  isFighting: boolean;
};

export type CharacterListResponse = {
  type: 'characterList';
  characters: CharacterList[];
};

// {
//     "message": "{\"initiator\":0,\"isActive\":true,\"isPaused\":false,\"participantsSide1\":[{\"id\":0,\"name\":\"new\",\"health\":924,\"maxHealth\":1000,\"isAlive\":true}],\"participantsSide2\":[{\"id\":2,\"name\":\"Goblin\",\"health\":70,\"maxHealth\":50,\"isAlive\":true}],\"type\":\"fightUpdates\"}",
//     "type": "fightUpdates"
// }

export type FightUpdatesType = {
  initiator: number;
  isActive: boolean;
  isPaused: boolean;
  participantsSide1: {
    id: number;
    name: string;
    health: number;
    maxHealth: number;
    isAlive: boolean;
    portrait: string;
  }[];

  participantsSide2: {
    id: number;
    name: string;
    health: number;
    maxHealth: number;
    isAlive: boolean;
    portrait: string;
  }[];
};

export type FightUpdatesResponse = {
  type: 'fightUpdates';
  message: string;
};

//{
// {
//     "message": "{\"name\":\"Icebolt\",\"sourceId\":2,\"targetId\":0,\"amount\":4,\"type\":\"ice\",\"critical\":false,\"icon\":\"🧊\",\"color\":\"#00FFFF\",\"visualEffect\":\"ice\"}",
//     "type": "damage"
// }
// }
// damageMessage := DamageInstanceClient{
// 	Amount:   damage.Amount,
// 	Type:     damage.Type,
// 	Critical: damage.Critical,
// 	SourceID: participant.GetID(),
// 	TargetID: target.GetID(),
// 	Name:     weapon.Item.Weapon.DamageVerb,
// 	Icon:     damage.Icon,
// 	Sound:    damage.Sound,
// }

export type Damage = {
  name: string;
  isSkill: boolean;
  isSourceChar: boolean;
  sourceId: number;
  targetId: number;
  sourceName: string;
  targetName: string;
  amount: number;
  type: string;
  critical: boolean;
  color?: string;
  icon?: string;
  sound?: string;
  visualEffect?: string;
};

export type DamageResponse = {
  type: 'damage';
  message: string;
};

export type MainBodyType = {
  type: 'view';
  message: 'room' | 'fight';
};

//"{\"type\":\"fights\",\"fights\":[{\"participantsSide1\":[{\"name\":\"aa\",\"uniqueID\":0}],\"participantsSide2\":[{\"name\":\"Goblin\",\"uniqueID\":1}],\"initiator\":{\"name\":\"aa\",\"uniqueID\":0},\"isActive\":true,\"isPaused\":false,\"fightID\":\"c2cd9e1384a6a7abaad14aa85550a0e6\",\"roomID\":1}]}"

export type FightsType = {
  participantsSide1: {
    name: string;
    uniqueID: number;
  }[];
  participantsSide2: {
    name: string;
    uniqueID: number;
  }[];
  initiator: {
    name: string;
    uniqueID: number;
  };
  isActive: boolean;
  isPaused: boolean;
  fightID: string;
  roomID: number;
};

export type FightsResponse = {
  type: 'fights';
  fights: FightsType[];
};

// {
//     "message": "{\"equippedItems\":[{\"empty\":true,\"slot\":\"Head\"},{\"empty\":true,\"slot\":\"Shoulders\"},{\"empty\":true,\"slot\":\"Chest\"},{\"empty\":true,\"slot\":\"Waist\"},{\"empty\":true,\"slot\":\"Arms\"},{\"empty\":true,\"slot\":\"Legs\"},{\"empty\":true,\"slot\":\"Hands\"},{\"empty\":true,\"slot\":\"Feet\"},{\"empty\":true,\"slot\":\"Finger1\"},{\"empty\":true,\"slot\":\"Finger2\"},{\"empty\":true,\"slot\":\"Neck\"},{\"empty\":true,\"slot\":\"Back\"},{\"empty\":true,\"slot\":\"Wrist1\"},{\"empty\":true,\"slot\":\"Wrist2\"},{\"empty\":true,\"slot\":\"MainHand\"},{\"empty\":true,\"slot\":\"OffHand\"}],\"health\":1000,\"level\":1,\"maxHealth\":1000,\"name\":\"bb\",\"portrait\":\"images/elf_female_1.png\"}",
//     "type": "lookcharacter"
// }

export type LookCharacterType = {
  equippedItems: EquipmentSlot[];
  health: number;
  level: number;
  maxHealth: number;
  name: string;
  portrait: string;
};

export type LookCharacterResponse = {
  type: 'lookcharacter';
  message: LookCharacterType[];
};

// {
//     "message": "{\"current_room\":{\"id\":113,\"x\":0,\"y\":0,\"z\":0,\"exits\":null},\"mini_map\":[{\"id\":113,\"x\":0,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"south\":true,\"west\":true}},{\"id\":114,\"x\":0,\"y\":-1,\"z\":0,\"exits\":{\"north\":true,\"west\":true}},{\"id\":115,\"x\":-1,\"y\":-1,\"z\":0,\"exits\":{\"east\":true,\"north\":true}},{\"id\":107,\"x\":-1,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"north\":true,\"south\":true,\"west\":true}},{\"id\":108,\"x\":-1,\"y\":1,\"z\":0,\"exits\":{\"north\":true,\"south\":true}},{\"id\":109,\"x\":-1,\"y\":2,\"z\":0,\"exits\":{\"east\":true,\"south\":true,\"west\":true}},{\"id\":111,\"x\":-2,\"y\":2,\"z\":0,\"exits\":{\"east\":true,\"south\":true}},{\"id\":112,\"x\":-2,\"y\":1,\"z\":0,\"exits\":{\"north\":true}},{\"id\":110,\"x\":0,\"y\":2,\"z\":0,\"exits\":{\"down\":true,\"west\":true}},{\"id\":122,\"x\":0,\"y\":2,\"z\":-1,\"exits\":{\"up\":true}},{\"id\":117,\"x\":-2,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"west\":true}},{\"id\":120,\"x\":-2,\"y\":0,\"z\":-1,\"exits\":{\"east\":true,\"west\":true}},{\"id\":121,\"x\":-1,\"y\":0,\"z\":-1,\"exits\":{\"west\":true}},{\"id\":116,\"x\":1,\"y\":0,\"z\":0,\"exits\":{\"west\":true}}],\"area_map\":[{\"id\":113,\"x\":0,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"south\":true,\"west\":true}},{\"id\":114,\"x\":0,\"y\":-1,\"z\":0,\"exits\":{\"north\":true,\"west\":true}},{\"id\":115,\"x\":-1,\"y\":-1,\"z\":0,\"exits\":{\"east\":true,\"north\":true}},{\"id\":107,\"x\":-1,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"north\":true,\"south\":true,\"west\":true}},{\"id\":108,\"x\":-1,\"y\":1,\"z\":0,\"exits\":{\"north\":true,\"south\":true}},{\"id\":109,\"x\":-1,\"y\":2,\"z\":0,\"exits\":{\"east\":true,\"south\":true,\"west\":true}},{\"id\":111,\"x\":-2,\"y\":2,\"z\":0,\"exits\":{\"east\":true,\"south\":true}},{\"id\":112,\"x\":-2,\"y\":1,\"z\":0,\"exits\":{\"north\":true}},{\"id\":110,\"x\":0,\"y\":2,\"z\":0,\"exits\":{\"down\":true,\"west\":true}},{\"id\":122,\"x\":0,\"y\":2,\"z\":-1,\"exits\":{\"up\":true}},{\"id\":117,\"x\":-2,\"y\":0,\"z\":0,\"exits\":{\"east\":true,\"west\":true}},{\"id\":118,\"x\":-3,\"y\":0,\"z\":0,\"exits\":{\"down\":true,\"east\":true}},{\"id\":119,\"x\":-3,\"y\":0,\"z\":-1,\"exits\":{\"east\":true,\"up\":true}},{\"id\":120,\"x\":-2,\"y\":0,\"z\":-1,\"exits\":{\"east\":true,\"west\":true}},{\"id\":121,\"x\":-1,\"y\":0,\"z\":-1,\"exits\":{\"west\":true}},{\"id\":116,\"x\":1,\"y\":0,\"z\":0,\"exits\":{\"west\":true}}]}",
//     "type": "updateMap"
// }

export type UpdateMapType = {
  current_room: {
    id: number;
    x: number;
    y: number;
    z: number;
    exits: { [direction: string]: boolean } | null;
  };
  mini_map: {
    id: number;
    x: number;
    y: number;
    z: number;
    isDifferentArea: boolean;
    exits: { [direction: string]: boolean } | null;
  }[];
  area_map: {
    id: number;
    x: number;
    y: number;
    z: number;
    isDifferentArea: boolean;
    exits: { [direction: string]: boolean } | null;
  }[];
};

// export type UpdateMapResponse = {
//   type: 'updateMap';
//   message: UpdateMapType;
// };

// {
//     "message": "{\"id\":1,\"title\":\"Journey to the Forgotten Cave\",\"description\":\"Travel to the Forgotten Cave and explore its depths.\",\"status\":\"available\",\"objective\":\"goto\",\"completionType\":\"roomEnter\",\"completionTargetName\":\"The Kitchen\",\"reward\":{\"exp\":50,\"itemId\":2,\"gold\":0},\"completed\":false}",
//     "type": "quest"
// }

// type QuestClient struct {
// 	ID                   int            `json:"id"`
// 	Title                string         `json:"title"`
// 	Description          string         `json:"description"`
// 	Status               string         `json:"status"` // "available", "active", "completed"
// 	Objective            QuestObjective `json:"objective"`
// 	CompletionType       string         `json:"completionType"`
// 	CompletionTargetName string         `json:"completionTargetName"`
// 	QuestReward          *QuestReward   `json:"reward,omitempty"`
// 	Completed            bool           `json:"completed"`
// }

export type QuestType = {
  id: number;
  title: string;
  description: string;
  status: string;
  objective: string;
  completionType: string;
  completionTargetName: string;
  reward: QuestRewardType; // changed from 'questReward'
  completed: boolean;
};

export type QuestRewardType = {
  exp: number;
  itemId: number[];
  gold: number;
};

// {
//     "message": "{\"From\":\"1f3f3b14-68e4-4537-a003-3eba476578c8\",\"To\":\"e52650b2-b5e3-4edd-b702-ab6017ae55c3\",\"FromName\":\"aa2\",\"FromLevel\":1,\"FromClass\":\"Mage\",\"FromPortrait\":\"images/human_male_1.png\",\"ToName\":\"testing\",\"Timestamp\":\"2023-10-13T23:44:53.475773214Z\",\"Status\":\"pending\"}",
//      "type": "groupInvite"
// }

export type GroupInviteType = {
  From: string;
  To: string;
  FromName: string;
  FromLevel: number;
  FromClass: string;
  FromPortrait: string;
  ToName: string;
  Timestamp: string;
  Status: string;
};

// {
//     "message": "{\"leaderHealth\":\"1000\",\"leaderName\":\"aa2\",\"leaderPortrait\":\"images/human_male_1.png\",\"leaderUUID\":\"1f3f3b14-68e4-4537-a003-3eba476578c8\",\"members\":[{\"UUID\":\"e52650b2-b5e3-4edd-b702-ab6017ae55c3\",\"health\":\"1000\",\"name\":\"testing\",\"portrait\":\"images/elf_female_1.png\"}]}",
//     "type": "groupUpdate"
// }

export type GroupUpdateType = {
  leaderHealth: string;
  leaderName: string;
  leaderPortrait: string;
  leaderUUID: string;
  clientUUID: string;
  members: {
    UUID: string;
    health: string;
    name: string;
    portrait: string;
  }[];
};

// {
//     "item": {
//         "armorDetails": " Armor Class: 4, Wear Slots: [Chest],",
//         "attributeModifiers": {
//             "Strength": 1
//         },
//         "category": "Armor",
//         "color": "#909090",
//         "description": "A sturdy chest piece made of leather.",
//         "durability": {
//             "current": 0,
//             "max": 100
//         },
//         "from": "testing",
//         "itemID": 7,
//         "level": 50,
//         "materials": [
//             "leather"
//         ],
//         "name": "Leather Chest Piece",
//         "rarity": "Trash",
//         "score": 22,
//         "statModifiers": {
//             "Health": 5
//         }
//     },
//     "type": "chatItem"
// }
export type ItemChatDetails = {
  armorDetails?: string;
  attributeModifiers?: { [key: string]: number };
  category?: string;
  color: string;
  description: string;
  durability?: { current: number; max: number };
  from?: string;
  itemID: number;
  level?: number;
  materials?: string[];
  name: string;
  rarity: string;
  score: number;
  statModifiers?: { [key: string]: number };
};

export type ChatItemType = {
  // from: string;
  item: ItemChatDetails;
};

// {
//     "monster": {
//         "from": "testing",
//         "monsterInstanceID": 1,
//         "type": "monsterDetails",
//         "name": "Goblin",
//         "shortDescription": "A sneaky goblin",
//         "longDescription": "This is a small, sneaky goblin with green skin and sharp teeth.",
//         "health": 90,
//         "mana": 0,
//         "icon": "goblin_male_1.png",
//         "effects": [
//             "Shield"
//         ],
//         "inventory": null,
//         "equipment": [
//             "Chest: Leather Chest Piece",
//             "Legs: Chainmail Leggings",
//             "MainHand: Wooden Mace"
//         ],
//         "level": 1,
//         "levelDiff": 0,
//         "rank": "",
//         "species": ""
//     },
//     "type": "chatMonster"
// }

// export type ChatMonsterType = {
//   from: string;
//   monster: MonsterDetail;
// };
export type MonsterChatDetail = {
  from: string;
  monsterInstanceID: number;
  type: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  health: number;
  mana: number;
  icon: string;
  effects: string[];
  inventory: null | string[]; // Or whatever type inventory might be
  equipment: string[];
  level: number;
  levelDiff: number;
  rank: string;
  species: string;
};

export type ChatMonsterType = {
  monster: MonsterChatDetail;
};

// {
//     "text": {
//         "from": "testing",
//         "text": "this is a test"
//     },
//     "type": "chatText"
// }

export type ChatTextPayload = {
  from: string;
  text: string;
};

export type ChatTextServerResponse = {
  type: 'chatText';
  text: ChatTextPayload;
};
