import { Outlet } from "react-router";
import { Box, Stack, Typography } from "@mui/material";
import widget from "../../assets/auth-widgets.png";

const AuthLayout = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", lg: "grid" },
          flexDirection: "column",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: "450px", width: "100%" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "var(--mui-palette-common-white)",
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography
                color="#fff"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
                variant="h1"
              >
                Welcome to{" "}
                <Box component="span" sx={{ color: "#15b79e" }}>
                  RB Dashboard
                </Box>
              </Typography>
              <Typography align="center" variant="subtitle1" color="#fff">
                A professional dashboard that comes with ready-to-use MUI
                components.
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                alt="Widgets"
                src={widget}
                sx={{ height: "auto", width: "100%", maxWidth: "600px" }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default AuthLayout;
