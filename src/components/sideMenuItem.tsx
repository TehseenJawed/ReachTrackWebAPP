import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  width: '100%',
  padding: 8,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#367cb5',
    boxShadow: 'none'
  },
}));

export default function SidemenuButton({Icon, title, clickHandler, customStyle}) {
    
  return (
    <Stack spacing={2} direction="column" className=''>
      <ColorButton onClick={clickHandler} className='flex flex-col justify-center items-center' variant="contained">
        <Icon />
        <p className={`text-[15px] text-center text-card ${customStyle}`}>{title}</p>
      </ColorButton>
    </Stack>
  );
}