import { useEffect } from "react";
import { fetchNotifications } from "../../store/slices/merchantSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import MerchantLoading from "./loading/MerchantLoading.jsx";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector((state) => state.merchant);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role === "merchant") {
      dispatch(fetchNotifications());
    }
  }, [dispatch, role]);

  if (isLoading) {
    return <MerchantLoading />;
  }
  return (
    <>
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
    </>
  );
};
export default Notifications;
