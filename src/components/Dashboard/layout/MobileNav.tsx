import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  // items?: NavItemConfig[];
}

const MobileNav = ({ open, onClose }: MobileNavProps) => {
  return (
    <>
      <Drawer
        slotProps={{
          paper: {
            sx: {
              "--MobileNav-background": "var(--mui-palette-neutral-950)",
              "--MobileNav-color": "var(--mui-palette-common-white)",
              "--NavItem-color": "var(--mui-palette-neutral-300)",
              "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
              "--NavItem-active-background": "var(--mui-palette-primary-main)",
              "--NavItem-active-color":
                "var(--mui-palette-primary-contrastText)",
              "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
              "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
              "--NavItem-icon-active-color":
                "var(--mui-palette-primary-contrastText)",
              "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
              bgcolor: "var(--MobileNav-background)",
              color: "var(--MobileNav-color)",
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              scrollbarWidth: "none",
              width: "var(--MobileNav-width)",
              zIndex: "var(--MobileNav-zIndex)",
              "&::-webkit-scrollbar": { display: "none" },
            },
          },
        }}
        onClose={onClose}
        open={open}
      >
        <Stack spacing={2} sx={{ p: 3 }}>
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
      </Drawer>
    </>
  );
};
export default MobileNav;
