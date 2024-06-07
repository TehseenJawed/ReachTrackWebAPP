import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useDispatch } from 'react-redux';
import {expandMenu, logoutAction} from '../redux/actions/authActions'
import { useSnackbar } from 'notistack';

export default function MenuOptions({expand, navigate, anchorEl, handleClose, open, menuItems, handleSelect}) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const handleChangeScreen = (v) => {
    if(v?.label === 'Logout') {
      //@ts-ignore
      dispatch(logoutAction((message, variant) => enqueueSnackbar(message, { variant: variant }), () => navigate('/login')))
    } else {
      console.log('In else',v);
      handleSelect(v); 
      handleClose()
    }
  }
  return (
    <div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={`-mt-12 sideinnermenu ${expand ? 'ml-28' : 'ml-14'}`}
      >
        {
            menuItems.map((v,i) => {
              if(v?.label === 'Users') {
                return null
              } else {
                return <MenuItem style={{paddingLeft: 35, paddingRight: 35}} className='!text-xs p-4' onClick={() => handleChangeScreen(v)}>{v?.label}</MenuItem>
              }
            })
        }
      </Menu>
    </div>
  );
}