export interface SiteConfig {
    website: string;
    author: string;
    desc: string;
    title: string;
    ogImage: string;
    favicon: string;
    lang: string;
}

export interface NavLink {
    href: string;
    label: string;
}

export interface SocialLink {
    name: string;
    href: string;
    linkTitle: string;
}
