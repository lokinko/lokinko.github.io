import type { CollectionEntry } from "astro:content";

export interface ListingItem {
    title: string;
    description?: string;
    date?: string;
    authors?: string;
    extraInput?: string;
    tags: string[];
    externalUrl?: string;
    image?: string;
}

export function toAssetUrl(path?: string): string | undefined {
    if (!path) return path;
    return path.startsWith("http") || path.startsWith("/") ? path : `/${path}`;
}

function formatDate(dateValue: string | undefined): string | undefined {
    if (!dateValue) return undefined;
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return undefined;
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

type ListingEntry = CollectionEntry<"publications"> | CollectionEntry<"projects">;

export function getListingItem(entry: ListingEntry): ListingItem {
    const data = entry.data;
    const publication = entry.collection === "publications" ? entry.data : undefined;

    return {
        title: data.title,
        description: data.description,
        date: formatDate(publication?.date),
        authors: publication?.author,
        extraInput: publication?.journal,
        tags: data.tags ?? [],
        externalUrl: data.external_url,
        image: toAssetUrl(data.image),
    };
}
