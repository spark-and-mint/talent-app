import { z } from "zod"

export const SignUpValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
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
})

export const ProfileValidation = z.object({
  primaryRole: z
    .string()
    .min(2, { message: "Role must be at least 2 characters." }),
  seniority: z.string().optional(),
  workStatus: z.string().optional(),
  rate: z.string().optional(),
  timezone: z.string().optional(),
  availability: z.string().optional(),
  website: z.string().url().nullish(),
  linkedin: z.string().url().nullish(),
  skills: z.array(optionSchema).optional(),
  domains: z.array(optionSchema).optional(),
  meeting: z
    .string()
    .min(1, { message: "Please book a meeting before submitting." }),
  file: z.custom<File[]>(),
})
