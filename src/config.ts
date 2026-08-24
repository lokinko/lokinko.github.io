export const SITE = {
    website: "https://lokinko.github.io/",
    author: "Xiangmou Qu",
    desc: "Machine Learning Algorithm Engineer at OPPO Research Institute, working on GUI agents, federated learning, and intelligent systems.",
    title: "Xiangmou Qu",
    ogImage: "",
    favicon: "/favicon.svg",
    lang: "en",
} as const;

export const NAV_LINKS = [
    { href: "/", label: "About" },
    { href: "/#news", label: "News" },
    { href: "/publications", label: "Publications" },
    { href: "/projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
] as const;

export const SOCIALS = [
    {
        href: "https://github.com/lokinko",
        linkTitle: "Xiangmou Qu on GitHub",
        icon: "Github",
    },
    {
        href: "https://scholar.google.com/citations?user=kzBPdVgAAAAJ&hl=en",
        linkTitle: "Xiangmou Qu on Google Scholar",
        icon: "GoogleScholar",
    },
    {
        href: "mailto:lokinko.cs@gmail.com",
        linkTitle: "Send an email to Xiangmou Qu",
        icon: "Mail",
    },
    {
        href: "https://www.zhihu.com/people/lokinko",
        linkTitle: "Xiangmou Qu on Zhihu",
        icon: "User",
    },
] as const;

export const PAGES = {
    home: {
        title: "About Me",
        subtitle: "",
    },
    publications: {
        title: "Publications",
        subtitle: "Research on agents, federated learning, recommendation, and distributed systems.",
    },
    projects: {
        title: "Projects",
        subtitle: "Agent systems and open-source research projects.",
    },
} as const;
