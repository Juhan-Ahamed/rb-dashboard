import type { User, Notification, Transaction, Purchase } from "../types";

export const usersData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "merchant" as const,
    status: "active" as const,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member" as const,
    status: "active" as const,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "merchant" as const,
    status: "inactive" as const,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "member" as const,
    status: "active" as const,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "admin" as const,
    status: "active" as const,
  },
];

export const purchaseData: Purchase[] = [
  {
    id: 1,
    customer: "John Doe",
    amount: 100,
    date: "2023-05-15",
    status: "pending" as const,
  },
  {
    id: 2,
    customer: "Jane Smith",
    amount: 200,
    date: "2023-05-14",
    status: "approved" as const,
  },
  {
    id: 3,
    customer: "Bob Johnson",
    amount: 150,
    date: "2023-05-13",
    status: "pending" as const,
  },
  {
    id: 4,
    customer: "Alice Brown",
    amount: 75,
    date: "2023-05-12",
    status: "rejected" as const,
  },
];

export const transactionData: Transaction[] = [
  {
    id: 1,
    description: "Purchase at Coffee Shop",
    date: "2023-05-15",
    points: 50,
    type: "earned" as const,
  },
  {
    id: 2,
    description: "Reward Redemption",
    date: "2023-05-10",
    points: 100,
    type: "spent" as const,
  },
  {
    id: 3,
    description: "Purchase at Book Store",
    date: "2023-05-05",
    points: 75,
    type: "earned" as const,
  },
  {
    id: 4,
    description: "Referral Bonus",
    date: "2023-05-01",
    points: 200,
    type: "earned" as const,
  },
];

export const notificationsData: Notification[] = [
  {
    id: 1,
    message: "New purchase requires approval from John Doe",
    type: "approval" as const,
    date: "2023-05-15 10:30",
    read: false,
  },
  {
    id: 2,
    message: "Contribution rate updated to 5%",
    type: "update" as const,
    date: "2023-05-14 15:45",
    read: true,
  },
  {
    id: 3,
    message: "New purchase requires approval from Bob Johnson",
    type: "approval" as const,
    date: "2023-05-13 09:15",
    read: false,
  },
  {
    id: 4,
    message: "System maintenance scheduled for tomorrow",
    type: "alert" as const,
    date: "2023-05-12 16:20",
    read: true,
  },
];
