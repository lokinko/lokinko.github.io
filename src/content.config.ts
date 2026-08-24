import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const sharedFields = {
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    external_url: z.string().optional(),
    image: z.string().optional(),
};

const publications = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
    schema: z.object({
        ...sharedFields,
        author: z.string().optional(),
        date: z.string().optional(),
        journal: z.string().optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object(sharedFields),
});

const bio = defineCollection({
    loader: glob({ pattern: "bio.md", base: "./src/content" }),
    schema: z.object({
        name: z.string(),
        avatar: z.string(),
        shortBio: z.string().optional(),
        institution: z.string().optional(),
        internship: z.array(z.object({
            role: z.string(),
            company: z.string(),
            period: z.string(),
            description: z.string().optional(),
        })).optional(),
    }),
});

export const collections = { publications, projects, bio };
