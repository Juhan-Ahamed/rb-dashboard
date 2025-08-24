import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tab,
  Tabs,
} from "@mui/material";
import { logout } from "../../store/slices/authSlice";
import {
  fetchPurchases,
  fetchNotifications,
  updateContributionRate,
} from "../../store/slices/merchantSlice";
import type { AppDispatch, RootState } from "../../store";
import MerchantLoading from "./loading/MerchantLoading.tsx";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`merchant-tabpanel-${index}`}
      aria-labelledby={`merchant-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MerchantDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { purchases, notifications, contributionRate, isLoading } = useSelector(
    (state: RootState) => state.merchant,
  );
  const { role } = useSelector((state: RootState) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [newContributionRate, setNewContributionRate] =
    useState(contributionRate);

  useEffect(() => {
    if (role === "merchant") {
      dispatch(fetchPurchases());
      dispatch(fetchNotifications());
    }
  }, [dispatch, role]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleApprovePurchase = (purchaseId: number) => {
    // Mock approval action
    alert(`Purchase ${purchaseId} approved!`);
  };

  const handleUpdateContributionRate = () => {
    dispatch(updateContributionRate(newContributionRate));
    alert("Contribution rate updated!");
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <MerchantLoading />;
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Typography variant="h4">Merchant Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Purchases" />
          <Tab label="Customer Lookup" />
          <Tab label="Contribution Rate" />
          <Tab label="Notifications" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Approve Purchases
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.id}</TableCell>
                    <TableCell>{purchase.customer}</TableCell>
                    <TableCell>${purchase.amount}</TableCell>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={purchase.status}
                        color={
                          purchase.status === "approved" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {purchase.status === "pending" && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleApprovePurchase(purchase.id)}
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Customer Lookup
          </Typography>
          <TextField
            fullWidth
            label="Search Customers"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.id}</TableCell>
                    <TableCell>{purchase.customer}</TableCell>
                    <TableCell>${purchase.amount}</TableCell>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={purchase.status}
                        color={
                          purchase.status === "approved" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Set Contribution Rate
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              label="Contribution Rate (%)"
              type="number"
              value={newContributionRate}
              onChange={(e) => setNewContributionRate(Number(e.target.value))}
              inputProps={{ min: 0, max: 100, step: 0.1 }}
            />
            <Button variant="contained" onClick={handleUpdateContributionRate}>
              Update Rate
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Current rate: {contributionRate}%
          </Typography>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Notifications
          </Typography>
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                divider
                sx={{
                  backgroundColor: notification.read
                    ? "transparent"
                    : "action.hover",
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={notification.message}
                  secondary={notification.date}
                />
                {!notification.read && (
                  <Chip label="New" color="primary" size="small" />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </TabPanel>
    </Container>
  );
};

export default MerchantDashboard;
