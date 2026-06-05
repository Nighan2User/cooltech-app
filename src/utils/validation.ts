import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter a valid mobile number")
    .max(15, "Enter a valid mobile number")
    .regex(/^[+]?[0-9\s-]+$/, "Only digits, spaces and - allowed"),
});
export type PhoneForm = z.infer<typeof phoneSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^[0-9]+$/, "OTP must be numeric"),
});
export type OtpForm = z.infer<typeof otpSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(10, "Enter a valid mobile number"),
  address: z.string().min(5, "Enter a valid address"),
});
export type ProfileForm = z.infer<typeof profileSchema>;

export const productSchema = z.object({
  title: z.string().min(1, "Select a product type"),
  description: z.string().optional().default(""),
  price: z.coerce.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Select a category"),
  location: z.string().min(2, "Add a location"),
  image: z.string().optional().default(""),
});
export type ProductForm = z.infer<typeof productSchema>;
