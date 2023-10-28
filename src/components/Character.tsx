import { FormControl, InputLabel, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import React from 'react';

import type { CharacterType } from '../types';

// export type CharacterType = {
//   type: string;
// };

type CharacterComponentProps = {
  characters: CharacterType[];
  selectedCharacter: CharacterType;
  // eslint-disable-next-line no-unused-vars
  onCharacterChange: (event: SelectChangeEvent) => void;
};

export const CharacterComponent = (props: CharacterComponentProps) => {
  //const [character, setCharacter] = useState({} as Character);

  // const handleChange = (event: SelectChangeEvent) => {
  //   //const index = props.characters.map((character) => character.name).indexOf(event.target.value as string);
  //   //setCharacter(props.characters[index]);
  //   props.onCharacterChange(event);
  // };

  // return a mui select component
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Character</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectedCharacter.name || ''}
          label="Character"
          onChange={props.onCharacterChange}
        >
          {props.characters.map((character) => (
            <MenuItem key={character.name} value={character.name}>
              {character.name}
            </MenuItem>
          ))}
        </Select>
        {/* <ComponentInputModal /> */}
      </FormControl>
    </React.Fragment>
  );
};

// const inputModalStyle = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export const ComponentInputModal = () => {
//   // set the open state to true by default so it opens the modal right away
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
//     setMessage(event.target.value);
//   };

//   const handleClick = () => {
//     setMessage('');
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen}>Create character</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={inputModalStyle}>
//           <Stack spacing={2}>
//             <CustomStyledItem>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 Select Class
//               </Typography>
//             </CustomStyledItem>
//             <CustomStyledItem>
//               <Select
//         labelId="demo-simple-select-label-class"
//         id="demo-simple-select-class"
//         label="class"
//         onChange={props.onCharacterChange}
//       >
//           <MenuItem key= value={character.name}>

//           </MenuItem>
//         ))}
//       </Select>
//             </CustomStyledItem>
//             <CustomStyledItem>
//               <Button variant="contained" onClick={handleClick}>
//                 Enter
//               </Button>
//             </CustomStyledItem>
//           </Stack>
//         </Box>
//       </Modal>
//     </div>
//   );
// };
