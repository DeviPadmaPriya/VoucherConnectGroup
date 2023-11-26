import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserProfile from './UserProfile';
import Popover from '@mui/material/Popover';
 
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
 
  const openProfilePopup = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const closeProfilePopup = () => {
    setAnchorEl(null);
  };
 
  const isProfilePopupOpen = Boolean(anchorEl);
 
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'black', height: '80px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Welcome
          </Typography>
          <div>
            <Button color="inherit" onClick={openProfilePopup}>
              <AccountCircleIcon />
              Profile
            </Button>
            <Popover
              open={isProfilePopupOpen}
              anchorEl={anchorEl}
              onClose={closeProfilePopup}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <UserProfile />
             
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
 
export default Navbar;