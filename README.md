# Role-Based Login and Dashboard System

A React-based application with TypeScript that implements a role-based authentication system with three user roles:
Admin, Merchant, and Member. The application features protected routing, form validation, and role-specific dashboards.

## Features

- **Role-Based Authentication**: Three distinct login/registration flows for Admin, Merchant, and Member roles
- **Protected Routing**: Route protection based on user roles
- **Form Validation**: Comprehensive form validation using React Hook Form and Zod
- **State Management**: Redux with TypeScript for predictable state management
- **UI Framework**: Material-UI for a clean and responsive design
- **Mock Authentication**: Local storage-based token management

## Tech Stack

- **Frontend**: React with TypeScript
- **Routing**: React Router
- **State Management**: Redux Toolkit with TypeScript
- **UI Framework**: Material-UI (MUI)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd role-based-auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
4. **Open your browser**

   Navigate to http://localhost:3000 to view the application

# Demo User Credentials

## Admin Account

- **Email**: `admin@example.com`
- **Password**: `password`
- **Access**: Full administrative privileges with user management capabilities

## Merchant Account

- **Store Name**: `Test Store`
- **Password**: `password`
- **Access**: Merchant dashboard with purchase approvals, customer lookup, and contribution rate settings

## Member Account

- **Email/Phone**: `test@example.com` or `1234567890`
- **Password**: `password`
- **OTP**: `123456` (when prompted)
- **Access**: Member dashboard with points summary and transaction history
