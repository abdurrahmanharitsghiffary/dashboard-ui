import { z } from 'zod';

export const updateEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .optional(),
  country: z
    .enum(['ID', 'USA', 'ENG', 'KR'], {
      required_error: 'Please select a country.'
    })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.'
    })
    .optional(),
  company: z
    .string()
    .min(1, {
      message: 'Company name is required.'
    })
    .optional(),
  gender: z
    .enum(['MALE', 'FEMALE'], {
      required_error: 'Please select a gender.'
    })
    .optional()
});

export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;
