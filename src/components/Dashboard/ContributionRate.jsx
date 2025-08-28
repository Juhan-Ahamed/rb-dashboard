import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateContributionRate } from "../../store/slices/merchantSlice.js";
import MerchantLoading from "./loading/MerchantLoading.jsx";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const ContributionRate = () => {
  const dispatch = useDispatch();
  const { contributionRate, isLoading } = useSelector(
    (state) => state.merchant,
  );
  const { role } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [newContributionRate, setNewContributionRate] =
    useState(contributionRate);

  const handleUpdateContributionRate = () => {
    dispatch(updateContributionRate(newContributionRate));
    alert("Contribution rate updated!");
  };

  if (isLoading) {
    return <MerchantLoading />;
  }
  return (
    <>
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
    </>
  );
};
export default ContributionRate;
