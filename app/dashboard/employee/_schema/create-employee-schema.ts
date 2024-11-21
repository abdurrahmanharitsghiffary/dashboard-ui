import { z } from 'zod';

export const createEmployeeSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  country: z.enum(['ID', 'USA', 'ENG'], {
    required_error: 'Please select a country.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  company: z.string().min(1, {
    message: 'Company name is required.'
  }),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Please select a gender.'
  })
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
