import { Avatar, Badge, Box, IconButton, Stack, Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import UserPopover from "./UserPopover";
import { useState } from "react";
import { usePopover } from "../../../hooks/usePopover.ts";
import AvatarImg from "../../../assets/avatar.png";
import MobileNav from "./MobileNav.tsx";

const MainNav = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid var(--mui-palette-divider)",
          backgroundColor: "var(--mui-palette-background-paper)",
          position: "sticky",
          top: 0,
          zIndex: "var(--mui-zIndex-appBar)",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "64px",
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: "none" } }}
            >
              <MenuOutlinedIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <IconButton>
                <PeopleOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <NotificationsOutlinedIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src={AvatarImg}
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </>
  );
};
export default MainNav;
