import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  Button,
  Typography,
  Alert,
  Stack,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { adminRegisterSchema } from "../../utils/validationSchemas";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminRegisterSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    dispatch(loginStart());

    // Mock registration
    setTimeout(() => {
      if (data.email && data.password) {
        dispatch(
          loginSuccess({
            token: "fake-admin-token",
            role: "admin",
          }),
        );
        navigate("/dashboard/admin");
      } else {
        const errorMsg = "Registration failed";
        dispatch(loginFailure(errorMsg));
        setError(errorMsg);
        console.log(error);
      }
    }, 1000);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Admin Registration</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account? <Link to="/login/admin">Sign in</Link>
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
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Confirm Password"
                  type="password"
                />
                {errors.confirmPassword ? (
                  <FormHelperText>
                    {errors.confirmPassword?.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isSubmitting} type="submit" variant="contained">
            {isSubmitting ? "Creating Account..." : "Register"}
          </Button>
        </Stack>
      </form>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
};

export default AdminRegister;
