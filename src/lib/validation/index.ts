import { z } from "zod"

export const SignUpValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  primaryRole: z
    .string()
    .min(2, { message: "Role must be at least 2 characters." }),
  file: z.custom<File[]>(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export const ClientValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  description: z.string().optional(),
  file: z.custom<File[]>(),
})

export const AccountValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email(),
  file: z.custom<File[]>(),
})

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

export const ProfileValidation = z.object({
  primaryRole: z
    .string()
    .min(2, { message: "Role must be at least 2 characters." }),
  seniority: z.string().optional(),
  workStatus: z.string().optional(),
  rate: z.string().optional(),
  timezone: z.string().optional(),
  domains: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one domain.",
  }),
  skills: z.array(optionSchema).optional(),
  file: z.custom<File[]>(),
})
