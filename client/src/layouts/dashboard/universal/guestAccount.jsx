import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import { Box,
         Avatar,
         Divider,
         Popover,
         MenuItem,
         Typography,
         IconButton } from "@mui/material";

         export default function GuestAccount() {
          const { dispatch } = useContext(AuthContext);
          const navigate = useNavigate();

          const handleLogout = () => {
            // Dispatch the LOGOUT action to update the authentication state
            dispatch({ type: 'LOGOUT' });

            // Redirect the user to the user-select page
            navigate("/user-select");
            };

            const [open, setOpen] = useState(null);
          
            const handleOpen = (event) => {
              setOpen(event.currentTarget);
            };
          
            const handleClose = () => {
              setOpen(null);
            };

            // Access user data from local storage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const displayName = storedUser ? storedUser.username : ''; 
            const userRole = storedUser ? storedUser.role : '';

            const defaultAccount = {
              displayName: "Gojo Satoru",
              photoURL: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1712842522~exp=1712846122~hmac=144600d5c33e0f1f8763ea42ac7139e3b5f91796e5eb51297a148461592657ba&w=360"
            };

            // Update the photoURL based on the user's role
            const account = userRole === 'Admin'
            ? { ...defaultAccount, photoURL: new URL('../../../img/admin_avatar.jpg', import.meta.url).toString() }
            : userRole === 'Monitoring-Officer'
              ? { ...defaultAccount, photoURL: new URL('../../../img/monitor_avatar.jpg', import.meta.url).toString() }
              : defaultAccount;
          
            return (
              <>
                <IconButton
                  onClick={handleOpen}
                  sx={{
                    width: 33,
                    height: 33,
                    background: '#10273d',
                    ...(open && {
                      background: '#8CACFF',
                    }),
                  }}
                >
                  <Avatar
                    src={account.photoURL}
                    alt={account.displayName}
                    sx={{
                      width: 30,
                      height: 30,
                      border: (theme) => `solid 1px ${theme.palette.background.default}`,
                    }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
          
                <Popover
                  open={!!open}
                  anchorEl={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 0,
                      mt: 1,
                      ml: 0.25,
                      width: 200,
                    },
                  }}
                >
                  <Box sx={{ my: 1.5, px: 2 }}>
                    <Typography variant="subtitle" 
                                noWrap
                                sx={{ fontFamily: "Archivo, 'sans-serif'",
                                      fontWeight: '600',}}>
                      {displayName}
                    </Typography>
                  </Box>
          
                  <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
          
                  <MenuItem
                    disableRipple
                    disableTouchRipple
                    onClick={handleLogout}
                    sx={{ typography: 'body2', fontFamily: "Archivo, 'sans-serif'", color: 'error.main', py: 1.5 }}
                  >
                    HOME
                  </MenuItem>
                </Popover>
              </>
            );
          }