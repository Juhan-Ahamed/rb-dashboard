import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { logout } from "../../../store/slices/authSlice.ts";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

const UserPopover = ({ anchorEl, onClose, open }: UserPopoverProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: "240px" } } }}
      >
        <Box sx={{ p: "16px 20px " }}>
          <Typography variant="subtitle1">Sofia Rivers</Typography>
          <Typography color="text.secondary" variant="body2">
            sofia.rivers@devias.io
          </Typography>
        </Box>
        <Divider />
        <MenuList
          disablePadding
          sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
        >
          <MenuItem href="/#" onClick={onClose}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem href="/#" onClick={onClose}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
export default UserPopover;
