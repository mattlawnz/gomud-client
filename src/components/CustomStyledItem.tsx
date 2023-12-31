import { Paper, styled } from '@mui/material';

export const CustomStyledItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: '100%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
