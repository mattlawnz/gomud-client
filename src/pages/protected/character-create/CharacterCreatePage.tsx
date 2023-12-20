import '../../../index.css';

import { Button, Card, CardContent, CardMedia, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { Form, useActionData, useLocation, useNavigation } from 'react-router-dom';

const classesData = [
  {
    value: 'mage',
    title: 'Mage',
    description: 'Mages cast spells and use magical powers.',
    image: '/src/assets/images/icon_mage.png', // Replace with actual mage image URL
  },
  {
    value: 'warrior',
    title: 'Warrior',
    description: 'Warriors are strong and tough, experts in melee combat.',
    image: '/src/assets/images/icon_warrior.png', // Replace with actual warrior image URL
  },
];
const racesData = [
  {
    value: 'human',
    title: 'Human',
    description: 'Humans are versatile and adaptive.',
    maleImage: '/src/assets/images/human_male_1.png',
    femaleImage: '/src/assets/images/human_female_1.png',
  },
  {
    value: 'elf',
    title: 'Elf',
    description: 'Elves are elegant and have a natural affinity for magic.',
    maleImage: '/src/assets/images/goblin_male_1.png',
    femaleImage: '/src/assets/images/elf_female_1.png',
  },
];

export function CharacterCreatePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';
  const [selectedClass, setSelectedClass] = useState('mage');
  const [selectedRace, setSelectedRace] = useState('human');
  const [selectedSex, setSelectedSex] = useState('male');
  const navigation = useNavigation();
  const isCreatingCharacter = navigation.formData?.get('select-class') != null;
  const actionData = useActionData() as { error: string } | undefined;

  const handleSelectClass = (value: string) => {
    setSelectedClass(value);
  };

  const handleSelectRace = (value: string) => {
    setSelectedRace(value);
  };

  const handleSelectSex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSex((event.target as HTMLInputElement).value);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p>Create a character</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <input type="hidden" name="select-class" value={selectedClass} />
        <label>
          Character name: <input name="character-name" />
        </label>

        {/* Sex Selection */}
        <RadioGroup row name="select-sex" value={selectedSex} onChange={handleSelectSex}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>

        <div style={{ display: 'flex', overflow: 'auto' }}>
          {classesData.map((classData) => (
            <Card
              key={classData.value}
              style={{
                minWidth: '200px',
                margin: '16px',
                cursor: 'pointer',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
              onClick={() => handleSelectClass(classData.value)}
              elevation={selectedClass === classData.value ? 8 : 1}
            >
              <CardMedia component="img" height="140" image={classData.image} alt={classData.title} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {classData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {classData.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other components like race selection can go here */}
        {/* Race Selection */}
        <div style={{ display: 'flex', overflow: 'auto' }}>
          {racesData.map((raceData) => (
            <Card
              key={raceData.value}
              style={{
                minWidth: '200px',
                margin: '16px',
                cursor: 'pointer',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
              onClick={() => handleSelectRace(raceData.value)}
              elevation={selectedRace === raceData.value ? 8 : 1}
            >
              <CardMedia
                component="img"
                height="140"
                image={selectedSex === 'male' ? raceData.maleImage : raceData.femaleImage}
                alt={raceData.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {raceData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {raceData.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <input type="hidden" name="select-race" value={selectedRace} />
        <Button type="submit" variant="contained" color="primary" disabled={isCreatingCharacter}>
          {isCreatingCharacter ? 'Creating character..' : 'Create character'}
        </Button>
        {/* <button type="submit" disabled={isCreatingCharacter}>
          {isCreatingCharacter ? 'Creating character..' : 'Create character'}
        </button> */}
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </div>
  );
}
