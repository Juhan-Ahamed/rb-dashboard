import { Box, Container, Paper, Typography } from "@mui/material";

const MerchantLoading = () => {
  return (
    <>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h4">
            <Box
              sx={{
                width: 300,
                height: 40,
                bgcolor: "grey.300",
                borderRadius: 1,
              }}
            />
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 120,
                  height: 36,
                  bgcolor: "grey.200",
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </Box>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              width: 200,
              height: 32,
              bgcolor: "grey.200",
              mb: 2,
              borderRadius: 1,
            }}
          />
          <Box>
            {[...Array(5)].map((_, idx) => (
              <Box key={idx} sx={{ display: "flex", gap: 2, mb: 1 }}>
                {[...Array(6)].map((__, col) => (
                  <Box
                    key={col}
                    sx={{
                      width: col === 1 ? 120 : 80,
                      height: 24,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  );
};
export default MerchantLoading;
