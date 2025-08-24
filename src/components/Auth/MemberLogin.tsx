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
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { memberLoginSchema } from "../../utils/validationSchemas";
import type { MemberLoginForm } from "../../utils/validationSchemas";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../store/slices/authSlice";
import type { AppDispatch, RootState } from "../../store";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const MemberLogin: React.FC = () => {
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
    watch,
  } = useForm<MemberLoginForm>({
    resolver: zodResolver(memberLoginSchema),
    defaultValues: {
      credential: "test@example.com",
      password: "password",
    },
  });

  watch("credential");

  useEffect(() => {
    if (token && role === "member") {
      navigate("/dashboard/member");
    }
    return () => {
      dispatch(clearError());
    };
  }, [token, role, navigate, dispatch]);

  const onSubmit = (data: MemberLoginForm) => {
    dispatch(loginStart());

    // Mock authentication
    setTimeout(() => {
      if (
        (data.credential === "test@example.com" ||
          data.credential === "1234567890") &&
        data.password === "password"
      ) {
        dispatch(
          loginSuccess({
            token: "fake-member-token",
            role: "member",
          }),
        );
      } else {
        dispatch(loginFailure("Invalid credentials or OTP"));
      }
    }, 1000);
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Member Login</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account? <Link to="/register/member">Sign up</Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="credential"
            render={({ field }) => (
              <FormControl error={Boolean(errors.credential)}>
                <InputLabel>Email or Phone Number</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Email or Phone Number"
                  type="text"
                />
                {errors.credential ? (
                  <FormHelperText>{errors.credential.message}</FormHelperText>
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
          test@example.com | 1234567890
        </Typography>{" "}
        with password{" "}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          password
        </Typography>
      </Alert>
    </Stack>
  );
};

export default MemberLogin;
