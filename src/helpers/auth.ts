import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .superRefine((value, ctx) => {
        if (!/[A-Za-z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one letter",
          });
        }

        if (!/\d/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one number",
          });
        }

        if (!/[^A-Za-z\d]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one special character",
          });
        }
      }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms of Use and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signupFormHook = () =>
  useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

export const USER_ROLES = [
  "Admin",
  "MarketingRep",
  "SalesRep",
  "CustomerSupportRep",
] as const;
// export type UserRole = typeof USER_ROLES[number];

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const loginFormHook = () =>
  useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
      path: ["password"],
    }),
});

// Export the type derived from the schema
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Define the user type required for the form hook
interface User {
  Fname: string;
  Sname: string;
  email: string;
  phone?: string;
  image?: string;
}

// Custom hook for form handling with existing user data
export function updateProfileFormHopok(user: User) {
  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.Fname || "",
      lastName: user?.Sname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
    mode: "onBlur",
  });

  return form;
}
