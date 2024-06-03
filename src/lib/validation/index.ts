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

export const CreateAccountValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z
    .string()
    .min(1, { message: "Company must be at least 1 character." }),
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

export const ResetValidation = z.object({
  email: z.string().email(),
})

export const PasswordsValidation = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string(),
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
  file: z.custom<File[]>(),
})

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export const ApplicationValidation = z.object({
  workStatus: z.string({
    required_error: "Please select your work status.",
  }),
  seniority: z.string({
    required_error: "Please select your seniority level.",
  }),
  roles: z.array(optionSchema, {
    required_error: "Please select at least one role.",
  }),
  skills: z.array(optionSchema, {
    required_error: "Please select at least one skill.",
  }),
  domains: z.array(optionSchema, {
    required_error: "Please select at least one domain or industry.",
  }),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
})

export const ProfileValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  file: z.custom<File[]>(),
  workStatus: z.string({
    required_error: "Please select your work status.",
  }),
  seniority: z.string({
    required_error: "Please select your seniority level.",
  }),
  roles: z.array(optionSchema, {
    required_error: "Please select at least one role.",
  }),
  skills: z.array(optionSchema, {
    required_error: "Please select at least one skill.",
  }),
  domains: z.array(optionSchema, {
    required_error: "Please select at least one domain or industry.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  lookingFor: z
    .string({
      required_error: "Please specify what kind of work you're looking for.",
    })
    .max(200, { message: "Please shorten your answer." }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
  rate: z.string({
    required_error: "Please select your preferred hourly rate.",
  }),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  x: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  farcaster: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  dribbble: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  behance: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
})

export const UpdateValidation = z.object({
  title: z
    .string()
    .min(2, { message: "The title must be at least 2 characters." }),
  link: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  type: z.string({
    required_error: "Please select a type.",
  }),
  description: z
    .string()
    .max(2200, { message: "Please shorten your description." }),
  file: z.custom<File[]>(),
})
