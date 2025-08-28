import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPurchases } from "../../store/slices/merchantSlice.js";
import MerchantLoading from "./loading/MerchantLoading.jsx";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const CustomerLookup = () => {
  const dispatch = useDispatch();
  const { purchases, notifications, contributionRate, isLoading } = useSelector(
    (state) => state.merchant,
  );
  const { role } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (role === "merchant") {
      dispatch(fetchPurchases());
    }
  }, [dispatch, role]);

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <MerchantLoading />;
  }
  return (
    <>
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
    </>
  );
};
export default CustomerLookup;
