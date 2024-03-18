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
  workStatus: z.string({
    invalid_type_error: "Please select your work status.",
  }),
  seniority: z.string({
    invalid_type_error: "Please select your seniority level.",
  }),
  primaryRole: z.string({
    invalid_type_error: "Please select your primary role.",
  }),
  rate: z.string({ required_error: "Please enter your hourly rate." }),
  timezone: z.string({
    invalid_type_error: "Please select a timezone.",
  }),
  availability: z.string({
    invalid_type_error: "Please select your availability.",
  }),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish(),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish(),
  skills: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one skill." }),
  domains: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one domain or industry." }),
  meeting: z.string().optional(),
  // meeting: z.string({
  //   required_error: "Please book a meeting before moving forward.",
  // }),
  file: z.custom<File[]>(),
})
