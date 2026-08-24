import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/lokinko",
        linkTitle: "Xiangmou Qu on Github",
    },
    {
        name: "Google Scholar",
        href: "https://scholar.google.com/citations?user=kzBPdVgAAAAJ&hl=en",
        linkTitle: "Xiangmou Qu on Google Scholar",
    },
    {
        name: "Mail",
        href: "mailto:lokinko.cs@gmail.com",
        linkTitle: "Send an email to Xiangmou Qu",
    },
    {
        name: "Zhihu",
        href: "https://www.zhihu.com/people/lokinko",
        linkTitle: "Xiangmou Qu on Zhihu",
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    "Google Scholar": "GoogleScholar",
    Mail: "Mail",
    Zhihu: "User",
};
