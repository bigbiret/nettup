import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(), // estimated reading time in minutes
  }),
});

export const collections = {
  'blog': blogCollection,
}; 