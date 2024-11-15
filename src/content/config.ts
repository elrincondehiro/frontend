import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CategorySchema, ProductSchema } from '@/types/global';


const categories = defineCollection({
    // By default the ID is a slug generated from
    // the path of the file relative to `base`
    loader: glob({ pattern: "**\/*.md", base: 'src/data/categories' }),
    schema: CategorySchema
});

const products = defineCollection({
    loader: glob({pattern: '**\/*.md', base: 'src/data/products'}),
    schema: ProductSchema
});


export const collections = {categories, products}