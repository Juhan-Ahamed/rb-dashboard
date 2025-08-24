import React, { useState } from "react";
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
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { memberRegisterSchema } from "../../utils/validationSchemas";
import type { MemberRegisterForm } from "../../utils/validationSchemas";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store";

const MemberRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberRegisterForm>({
    resolver: zodResolver(memberRegisterSchema),
  });

  const onSubmit = async (data: MemberRegisterForm) => {
    setError(null);
    dispatch(loginStart());

    // Mock registration
    setTimeout(() => {
      if (data.email && data.password) {
        dispatch(
          loginSuccess({
            token: "fake-member-token",
            role: "member",
          }),
        );
        navigate("/dashboard/member");
      } else {
        const errorMsg = "Registration failed";
        dispatch(loginFailure(errorMsg));
        setError(errorMsg);
        console.error(error);
      }
    }, 1000);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Member Registration</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account? <Link to="/login/member">Sign in</Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>First name</InputLabel>
                <OutlinedInput {...field} label="First name" />
                {errors.firstName ? (
                  <FormHelperText>{errors.firstName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.lastName ? (
                  <FormHelperText>{errors.lastName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
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
            name="phone"
            render={({ field }) => (
              <FormControl error={Boolean(errors.phone)}>
                <InputLabel>Phone Number</InputLabel>
                <OutlinedInput {...field} label="Phone Number" type="phone" />
                {errors.phone ? (
                  <FormHelperText>{errors.phone.message}</FormHelperText>
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

export default MemberRegister;
