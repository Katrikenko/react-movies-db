import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

interface UserSettingsMenuProps {
  user: {
    name?: string;
    picture?: string;
  };
  onOpenProfile: () => void;
  onLogout: () => void;
}

export function UserSettingsMenu({ user, onOpenProfile, onLogout }: UserSettingsMenuProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            onOpenProfile();
          }}
        >
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            onLogout();
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
