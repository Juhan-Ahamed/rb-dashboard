import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  PointOfSale as PointOfSaleIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { logout } from "../../store/slices/authSlice";
import { fetchPoints, fetchTransactions } from "../../store/slices/memberSlice";
import type { AppDispatch, RootState } from "../../store";
import MemberLoading from "./loading/MemberLoading.tsx";

const MemberDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { points, transactions, isLoading } = useSelector(
    (state: RootState) => state.member,
  );
  const { role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (role === "member") {
      dispatch(fetchPoints());
      dispatch(fetchTransactions());
    }
  }, [dispatch, role]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <MemberLoading />;
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Member Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PointOfSaleIcon sx={{ mr: 1 }} /> Points Summary
            </Typography>
            <Card
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="h3" component="div" align="center">
                  {points}
                </Typography>
                <Typography variant="h6" align="center">
                  Total Points
                </Typography>
              </CardContent>
            </Card>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">150</Typography>
                  <Typography variant="body2">
                    Points Earned This Month
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">25</Typography>
                  <Typography variant="body2">Available Rewards</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HistoryIcon sx={{ mr: 1 }} /> Recent Transactions
            </Typography>
            <List>
              {transactions.slice(0, 5).map((transaction, index) => (
                <div key={transaction.id}>
                  <ListItem>
                    <ListItemText
                      primary={transaction.description}
                      secondary={`${transaction.date} - ${transaction.points} points`}
                    />
                    <Typography
                      variant="body2"
                      color={
                        transaction.type === "earned"
                          ? "success.main"
                          : "error.main"
                      }
                    >
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.points}
                    </Typography>
                  </ListItem>
                  {index < transactions.length - 1 && <Divider />}
                </div>
              ))}
            </List>
            {transactions.length === 0 && (
              <Typography variant="body2" color="text.secondary" align="center">
                No transactions yet
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              How to Earn More Points
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="primary">
                    🛍️
                  </Typography>
                  <Typography variant="body2">
                    Make purchases at partner stores
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="primary">
                    👥
                  </Typography>
                  <Typography variant="body2">
                    Refer friends and family
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="primary">
                    📱
                  </Typography>
                  <Typography variant="body2">
                    Use the mobile app for purchases
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="primary">
                    🎯
                  </Typography>
                  <Typography variant="body2">
                    Participate in special promotions
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MemberDashboard;
