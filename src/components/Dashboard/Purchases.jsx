import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fetchPurchases } from "../../store/slices/merchantSlice.js";
import { useDispatch, useSelector } from "react-redux";
import MerchantLoading from "./loading/MerchantLoading.jsx";

const Purchases = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { purchases, isLoading } = useSelector((state) => state.merchant);

  useEffect(() => {
    if (role === "merchant") {
      dispatch(fetchPurchases());
    }
  }, [dispatch, role]);

  const handleApprovePurchase = (purchaseId) => {
    // Mock approval action
    alert(`Purchase ${purchaseId} approved!`);
  };

  if (isLoading) {
    return <MerchantLoading />;
  }

  return (
    <>
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
    </>
  );
};
export default Purchases;
