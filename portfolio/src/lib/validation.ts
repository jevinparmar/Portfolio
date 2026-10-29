import { z } from 'zod'

export const PROJECT_TYPES = [
  'Website',
  'Web App',
  'Freelance',
  'Collaboration',
  'Other',
] as const

export const BUDGET_TIERS = [
  '< $5k',
  '$5k - $15k',
  '$15k - $30k',
  '$30k+',
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type BudgetTier = (typeof BUDGET_TIERS)[number]

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please provide your full name (at least 2 characters).')
    .max(100, 'Name cannot exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(100, 'Email cannot exceed 100 characters.'),
  projectType: z.enum(PROJECT_TYPES, {
    message: 'Please select a project type.',
  }),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(20, 'Please write at least 20 characters describing your project or request.')
    .max(2000, 'Message cannot exceed 2000 characters.'),
  honeypot: z.string().max(0, 'Spam detected.'),
  formStartTime: z.number(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
