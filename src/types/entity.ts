import { z } from 'zod';

export const entity = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Entity<T> = z.infer<typeof entity> & T;
