import { Box, Divider, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const SideNav = () => {
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
          <Box sx={{ display: "inline-flex" }}>RB Dashboard</Box>
        </Stack>
        <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
        <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
          <Stack
            component="ul"
            spacing={1}
            sx={{ listStyle: "none", m: 0, p: 0 }}
          >
            <li>
              <Box
                sx={{
                  alignItems: "center",
                  borderRadius: 1,
                  color: "var(--NavItem-color)",
                  cursor: "pointer",
                  display: "flex",
                  flex: "0 0 auto",
                  gap: 1,
                  p: "6px 16px",
                  position: "relative",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flex: "0 0 auto",
                  }}
                >
                  <HomeOutlinedIcon />
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
                    Home
                  </Typography>
                </Box>
              </Box>
            </li>
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
