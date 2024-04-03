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

export const ApplicationValidation = z.object({
  workStatus: z.string().min(1, { message: "Please select your work status." }),
  seniority: z
    .string()
    .min(1, { message: "Please select your seniority level." }),
  roles: z
    .array(optionSchema, { required_error: "Please select at least one role." })
    .min(1, { message: "Please select at least one role." }),
  skills: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one skill." }),
  domains: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one domain or industry." }),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .or(z.literal("")),
})

export const ProfileValidation = z.object({
  availability: z.string(),
  rate: z.string(),
  timezone: z.string(),
  workStatus: z.string().min(1, { message: "Please select your work status." }),
  lookingFor: z.string().max(200, { message: "Please shorten your answer." }),
  seniority: z
    .string()
    .min(1, { message: "Please select your seniority level." }),
  roles: z
    .array(optionSchema, { required_error: "Please select at least one role." })
    .min(1, { message: "Please select at least one role." }),
  skills: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one skill." }),
  domains: z
    .array(optionSchema)
    .min(1, { message: "Please select at least one domain or industry." }),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  github: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  x: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  farcaster: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  dribbble: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
  behance: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .nullish()
    .or(z.literal("")),
})

export const UpdateValidation = z.object({
  title: z
    .string()
    .min(2, { message: "The title must be at least 2 characters." }),
  link: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .or(z.literal("")),
  type: z.string(),
  milestone: z.string(),
  description: z.string(),
  file: z.custom<File[]>(),
})
