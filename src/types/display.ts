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

export interface DetailItem extends ListingItem {
    backHref: string;
}
