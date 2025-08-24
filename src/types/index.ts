export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "merchant" | "member";
  status: "active" | "inactive";
}

export interface Purchase {
  id: number;
  customer: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface Notification {
  id: number;
  message: string;
  type: "approval" | "update" | "alert";
  date: string;
  read: boolean;
}

export interface AuthState {
  token: string | null;
  role: "admin" | "merchant" | "member" | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminState {
  users: User[];
  isLoading: boolean;
}

export interface MerchantState {
  purchases: Purchase[];
  customers: any[];
  contributionRate: number;
  notifications: Notification[];
  isLoading: boolean;
}

export interface MemberState {
  points: number;
  transactions: Transaction[];
  isLoading: boolean;
}

export interface Transaction {
  id: number;
  description: string;
  date: string;
  points: number;
  type: "earned" | "spent";
}
