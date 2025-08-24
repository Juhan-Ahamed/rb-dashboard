import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  Button,
  Typography,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { adminLoginSchema } from "../../utils/validationSchemas";
import type { AdminLoginForm } from "../../utils/validationSchemas";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../store/slices/authSlice";
import type { AppDispatch, RootState } from "../../store";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, token, role } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "password",
    },
  });

  useEffect(() => {
    if (token && role === "admin") {
      navigate("/dashboard/admin");
    }
    return () => {
      dispatch(clearError());
    };
  }, [token, role, navigate, dispatch]);

  const onSubmit = (data: AdminLoginForm) => {
    dispatch(loginStart());

    // Mock authentication
    setTimeout(() => {
      if (data.email === "admin@example.com" && data.password === "password") {
        dispatch(
          loginSuccess({
            token: "fake-admin-token",
            role: "admin",
          }),
        );
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    }, 1000);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Admin Login</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account? <Link to="/register/admin">Sign up</Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <RemoveRedEyeOutlinedIcon
                        cursor="pointer"
                        fontSize="small"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        cursor="pointer"
                        fontSize="small"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </Stack>
      </form>

      <Alert color="warning">
        Use{" "}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          admin@example.com
        </Typography>{" "}
        with password{" "}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          password
        </Typography>
      </Alert>
    </Stack>
  );
};

export default AdminLogin;
