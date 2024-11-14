import {z} from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  order: z.number().int(),
  active: z.boolean(),
  cover: z.string().url(),
});

export const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  gallery: z.string().url().array(),
  categories: z.string().array(),
  active: z.boolean(),
  featured: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;