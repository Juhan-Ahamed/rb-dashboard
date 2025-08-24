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
import { merchantLoginSchema } from "../../utils/validationSchemas";
import type { MerchantLoginForm } from "../../utils/validationSchemas";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../store/slices/authSlice";
import type { AppDispatch, RootState } from "../../store";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const MerchantLogin: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, token, role } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchantLoginForm>({
    resolver: zodResolver(merchantLoginSchema),
    defaultValues: {
      storeName: "Test Store",
      password: "password",
    },
  });

  useEffect(() => {
    if (token && role === "merchant") {
      navigate("/dashboard/merchant");
    }
    return () => {
      dispatch(clearError());
    };
  }, [token, role, navigate, dispatch]);

  const onSubmit = (data: MerchantLoginForm) => {
    dispatch(loginStart());

    // Mock authentication
    setTimeout(() => {
      if (data.storeName === "Test Store" && data.password === "password") {
        dispatch(
          loginSuccess({
            token: "fake-merchant-token",
            role: "merchant",
          }),
        );
      } else {
        dispatch(loginFailure("Invalid credentials"));
        console.error(error);
      }
    }, 1000);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Merchant Login</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{" "}
          <Link to="/register/merchant">Sign up</Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="storeName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.storeName)}>
                <InputLabel>Store Name</InputLabel>
                <OutlinedInput {...field} label="Store Name" />
                {errors.storeName ? (
                  <FormHelperText>{errors.storeName.message}</FormHelperText>
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
          Test Store
        </Typography>{" "}
        with password{" "}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          password
        </Typography>
      </Alert>
    </Stack>
  );
};

export default MerchantLogin;
