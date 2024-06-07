import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { IoNotifications } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { FaBell } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const settings = ['Help', 'About Us', 'Account', 'Users', 'Roles', 'Logout'];

function ResponsiveTopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    localStorage.removeItem('user')
    window.location.reload()
  };

  return (
    <AppBar position="static" className='top-container'>
      <div className='flex !bg-green !w-11/12 justify-end'>
        <Toolbar disableGutters>
          <div className='mr-8'>
            <FaBell size={20} color="#fff" />
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <div className='flex justify-center items-center'>
              <div className='mr-6 relative'>
                <Badge badgeContent={400} color="primary">
                  <IoNotifications size={25} color={"#242a2b"} />
                </Badge>
              </div>
              {/* <div className='mr-6 relative'>
                <span className='absolute border  -top-2 z-10 bg-red-500 ml-4 w-6 h-6 rounded-full flex justify-center items-center text-sm'>21</span>
                <IoNotifications size={25} color={"#242a2b"} />
              </div> */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Tehseen" src="/static/images/avatar/2.jpg" />
                  <Typography ml={1}>Tehseen Jawed</Typography>
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default ResponsiveTopBar;