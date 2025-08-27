import { Box, Container, Paper, Skeleton } from "@mui/material";

const MemberLoading = () => {
  return (
    <>
      <Container>
        <Box sx={{ width: 1, mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Skeleton variant="text" width={200} height={40} />
            </Box>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              sx={{ mb: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={60}
              sx={{ mb: 2 }}
            />
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Paper>
        </Box>
      </Container>
    </>
  );
};
export default MemberLoading;
