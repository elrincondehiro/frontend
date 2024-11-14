import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CategorySchema } from '@/types/global';


const categories = defineCollection({
    // By default the ID is a slug generated from
    // the path of the file relative to `base`
    loader: glob({ pattern: "**\/*.md", base: "src/data/categories" }),
    schema: CategorySchema
  });

const products = defineCollection({
    loader: glob({pattern: '**\/*.md', base: 'src/data/products'}),
    schema: z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        price: z.number().positive(),
        stock: z.number().int().nonnegative(),
        gallery: z.string().url().array(),
        categories: z.string().array(),
        active: z.boolean(),
        featured: z.boolean(),
    })
})

export const collections = {categories, products}