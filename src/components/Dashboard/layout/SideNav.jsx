import { Box, Divider, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

import { useSelector } from "react-redux";
import { getMenuItems } from "../../../data/menuData.jsx";

const SideNav = () => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();
  const menuItems = getMenuItems(role);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Box
        sx={{
          "--SideNav-background": "var(--mui-palette-neutral-950)",
          "--SideNav-color": "var(--mui-palette-common-white)",
          "--NavItem-color": "var(--mui-palette-neutral-300)",
          "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
          "--NavItem-active-background": "var(--mui-palette-primary-main)",
          "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
          "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
          "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
          "--NavItem-icon-active-color":
            "var(--mui-palette-primary-contrastText)",
          "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
          bgcolor: "var(--SideNav-background)",
          color: "var(--SideNav-color)",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          height: "100%",
          left: 0,
          maxWidth: "100%",
          position: "fixed",
          scrollbarWidth: "none",
          top: 0,
          width: "var(--SideNav-width)",
          zIndex: "var(--SideNav-zIndex)",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Stack spacing={2} sx={{ p: 2.5 }}>
          <Box sx={{ display: "inline-flex" }}>
            RB Dashboard {role && `(${role.toUpperCase()})`}
          </Box>
        </Stack>
        <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
        <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
          <Stack
            component="ul"
            spacing={1}
            sx={{ listStyle: "none", m: 0, p: 0 }}
          >
            {menuItems.map((item, index) => {
              const active = isActive(item.path);

              return (
                <li key={index}>
                  <Box
                    component={Link}
                    to={item.path}
                    sx={{
                      alignItems: "center",
                      borderRadius: 1,
                      color: active
                        ? "var(--NavItem-active-color)"
                        : "var(--NavItem-color)",
                      cursor: "pointer",
                      display: "flex",
                      flex: "0 0 auto",
                      gap: 1,
                      p: "6px 16px",
                      position: "relative",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      backgroundColor: active
                        ? "var(--NavItem-active-background)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: active
                          ? "var(--NavItem-active-background)"
                          : "var(--NavItem-hover-background)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        flex: "0 0 auto",
                        color: active
                          ? "var(--NavItem-icon-active-color)"
                          : "var(--NavItem-icon-color)",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ flex: "1 1 auto" }}>
                      <Typography
                        component="span"
                        sx={{
                          color: "inherit",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          lineHeight: "28px",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
        <Stack spacing={2} sx={{ p: "12px" }}>
          <div>
            <Typography
              color="var(--mui-palette-neutral-100)"
              variant="subtitle2"
            >
              Need more features?
            </Typography>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
              Check out our Pro solution template.
            </Typography>
          </div>
        </Stack>
      </Box>
    </>
  );
};
export default SideNav;
