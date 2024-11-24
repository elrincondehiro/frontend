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

export const CartItemSchema = ProductSchema
  .omit({
    stock:true,
    gallery:true,
    categories:true,
    active:true,
    featured:true,
  })
  .extend({
    imageSrc: z.string().url(),
    quantity: z.number().int().nonnegative(),
  }
);

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number().nonnegative(),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;