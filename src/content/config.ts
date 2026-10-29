import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    cat: z.string(),
    lang: z.enum(['en', 'ru', 'uz']),
    key: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writeups };
