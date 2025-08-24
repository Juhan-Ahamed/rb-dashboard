import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;

export const merchantLoginSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type MerchantLoginForm = z.infer<typeof merchantLoginSchema>;

export const memberLoginSchema = z.object({
  credential: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type MemberLoginForm = z.infer<typeof memberLoginSchema>;

export const adminRegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type AdminRegisterForm = z.infer<typeof adminRegisterSchema>;

export const merchantRegisterSchema = z
  .object({
    storeName: z.string().min(1, "Store name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type MerchantRegisterForm = z.infer<typeof merchantRegisterSchema>;

export const memberRegisterSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type MemberRegisterForm = z.infer<typeof memberRegisterSchema>;
