import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    type: z.enum(["client", "open-source", "demo"]),
    github: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    locale: z.enum(["en", "tr"]),
  }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number().default(0),
    locale: z.enum(["en", "tr"]),
  }),
});

export const collections = { projects, services };
