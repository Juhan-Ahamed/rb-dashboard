import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export const adminMenuItems = [
  {
    icon: <DashboardOutlinedIcon />,
    label: "Dashboard",
    path: "/dashboard/admin",
  },
];

export const merchantMenuItems = [
  {
    icon: <ShoppingCartOutlinedIcon />,
    label: "Purchases",
    path: "/dashboard/merchant/purchases",
  },
  {
    icon: <PersonSearchOutlinedIcon />,
    label: "Customer Lookup",
    path: "/dashboard/merchant/customer-lookup",
  },
  {
    icon: <PercentOutlinedIcon />,
    label: "Contribution Rate",
    path: "/dashboard/merchant/contribution-rate",
  },
  {
    icon: <NotificationsOutlinedIcon />,
    label: "Notifications",
    path: "/dashboard/merchant/notifications",
  },
];

export const memberMenuItems = [
  {
    icon: <DashboardOutlinedIcon />,
    label: "Dashboard",
    path: "/dashboard/member",
  },
];

// Get menu items based on role
export const getMenuItems = (role) => {
  switch (role) {
    case "admin":
      return [...adminMenuItems];
    case "merchant":
      return [...merchantMenuItems];
    case "member":
      return [...memberMenuItems];
    default:
      return [...adminMenuItems];
  }
};
