export type IconName =
  | 'bookOpen'
  | 'code'
  | 'graduationCap'
  | 'mail'
  | 'mapPin'
  | 'newspaper'
  | 'sparkles';

export type CitationMetric = {
  label: string;
  dataUrl: string;
  fallbackCount: number;
};

export type ContentLink = {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
  metric?: CitationMetric;
};

export type SectionHeaderContent = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type Publication = {
  title: string;
  venue: string;
  date: string;
  authors: string;
  tags: string[];
  href?: string;
  note?: string;
};

export type Activity = {
  date: string;
  title: string;
  body: string;
  href?: string;
};

export type SiteContent = {
  metadata: {
    language: string;
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    themeColor: string;
  };
  header: {
    brand: {
      label: string;
      ariaLabel: string;
      href: string;
    };
    navigationAriaLabel: string;
    navigation: ContentLink[];
  };
  hero: {
    id: string;
    eyebrow: string;
    title: string;
    lede: string;
    actionsAriaLabel: string;
    actions: ContentLink[];
  };
  profile: {
    ariaLabel: string;
    avatar: {
      src: string;
      alt: string;
      fallback: string;
    };
    signature: {
      label: string;
      ariaLabel: string;
    };
    organization: string;
    location: string;
    facts: Array<{
      label: string;
      value: string;
    }>;
  };
  research: {
    id: string;
    header: SectionHeaderContent;
    body: string[];
    interests: {
      title: string;
      icon: IconName;
      items: string[];
    };
  };
  publications: {
    id: string;
    header: SectionHeaderContent;
    items: Publication[];
  };
  activities: {
    id: string;
    header: SectionHeaderContent;
    items: Activity[];
  };
  footer: Array<{
    icon: IconName;
    text: string;
  }>;
};

export const siteContent: SiteContent = {
  metadata: {
    language: 'en',
    title: 'Xiangmou Qu | Machine Learning Algorithm Engineer',
    description:
      'Xiangmou Qu, Machine Learning Algorithm Engineer at OPPO Research Institute. Research on GUI agents, federated learning, and distributed systems.',
    ogTitle: 'Xiangmou Qu',
    ogDescription:
      'Machine Learning Algorithm Engineer working on GUI agents, federated learning, and edge-cloud collaborative computing.',
    themeColor: '#f6f3ea',
  },
  header: {
    brand: {
      label: 'lokinko',
      ariaLabel: 'home',
      href: '#top',
    },
    navigationAriaLabel: 'Primary navigation',
    navigation: [
      { label: 'Research', href: '#research' },
      { label: 'Publications', href: '#publications' },
      { label: 'Activities', href: '#activities' },
      { label: 'Contact', href: 'mailto:lokinko.cs@gmail.com' },
    ],
  },
  hero: {
    id: 'top',
    eyebrow: 'Machine Learning Algorithm Engineer',
    title: 'Xiangmou Qu',
    lede:
      'Building practical intelligent systems for mobile GUI agents, collaborative agent frameworks, federated learning, and edge-cloud collaborative computing.',
    actionsAriaLabel: 'Profile links',
    actions: [
      { label: 'GitHub', href: 'https://github.com/lokinko', icon: 'code', external: true },
      { label: 'Email', href: 'mailto:lokinko.cs@gmail.com', icon: 'mail' },
      { label: 'Zhihu', href: 'https://www.zhihu.com/people/lokinko', icon: 'newspaper', external: true },
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=kzBPdVgAAAAJ&hl=en',
        icon: 'graduationCap',
        external: true,
        metric: {
          label: 'citations',
          dataUrl: '/scholar.json',
          fallbackCount: 104,
        },
      },
    ],
  },
  profile: {
    ariaLabel: 'Profile summary',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/42462005?v=4&s=224',
      alt: '',
      fallback: 'XQ',
    },
    signature: {
      label: 'lokinko',
      ariaLabel: 'lokinko signature',
    },
    organization: 'OPPO Research Institute',
    location: 'Shenzhen, China',
    facts: [
      { label: 'Focus', value: 'GUI Agents, Federated Learning' },
      { label: 'Education', value: 'Chongqing University, M.S.' },
    ],
  },
  research: {
    id: 'research',
    header: {
      eyebrow: 'About Me',
      title: '',
      description:
        'I work on agentic mobile operation, collaborative intelligence, and efficient learning systems that move from papers into usable infrastructure.',
    },
    body: [
    ],
    interests: {
      title: 'Interests',
      icon: 'sparkles',
      items: [
        'GUI Agents',
        'Multi-Agent Collaboration',
        'Edge-Cloud Computing',
        'Recommender Systems',
      ],
    },
  },
  publications: {
    id: 'publications',
    header: {
      eyebrow: 'Selected Publications',
      title: 'Recent Publications',
    },
    items: [
      {
        title: 'ColorBench: Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks',
        venue: 'The Web Conference(WWW) 2026, Oral',
        date: 'Jan 13, 2026',
        authors:
          'Yuanyi Song, Heyuan Huang, Qiqiang Lin, Yin Zhao, Xiangmou Qu, Jun Wang, Xingyu Lou, Weiwen Liu, Zhuosheng Zhang, Jun Wang, Yong Yu, Weinan Zhang, Zhaoxiang Wang',
        tags: ['Benchmarking', 'Mobile Agents', 'Long-Horizon Tasks'],
        note: 'Oral',
        href: 'https://arxiv.org/abs/2510.14621',
      },
      {
        title: 'MobileUse: A Hierarchical Reflection-Driven GUI Agent for Autonomous Mobile Operation',
        venue: 'NeurIPS 2025',
        date: 'Sep 18, 2025',
        authors:
          'Ning Li, Xiangmou Qu, Jiamu Zhou, Jun Wang, Muning Wen, Kounianhua Du, Xingyu Lou, Qiuying Peng, Jun Wang, Weinan Zhang',
        tags: ['GUI Agents', 'Mobile Operation', 'Reflection'],
        href: 'https://arxiv.org/abs/2507.16853',
      },
      {
        title:
          'JCSRC: Joint Client Selection and Resource Configuration for Energy-Efficient Multi-Task Federated Learning',
        venue: 'IEEE Transactions on Computers',
        date: 'Aug 24, 2025',
        authors: 'Junpeng Ke, Junlong Zhou, Dan Meng, Yue Zeng, Yizhou Shi, Xiangmou Qu, Song Guo',
        tags: ['Federated Learning', 'Energy Efficiency', 'Resource Configuration'],
        href: 'https://ieeexplore.ieee.org/abstract/document/11151100',
      },
      {
        title:
          'Personalized Federated Recommendation with Multi-Faceted User Representation and Global Consistent Prototype',
        venue: 'CIKM 2025',
        date: 'Aug 5, 2025',
        authors:
          'Jiaming Qian, Xinting Liao, Xiangmou Qu, Zhihui Fu, Xingyu Lou, Changwang Zhang, Pengyang Zhou, Zijun Zhou, Jun Wang, Chaochao Chen',
        tags: ['Federated Learning', 'Recommendation Systems', 'Personalization'],
      },
      {
        title:
          'FedEcover: Fast and Stable Converging Model-Heterogeneous Federated Learning with Efficient-Coverage Submodel Extraction',
        venue: 'ICDE 2025',
        date: 'Mar 26, 2025',
        authors: 'Juntao Liang, Lan Zhang, Xiangmou Qu, Jun Wang',
        tags: ['Federated Learning', 'Model Heterogeneity', 'Convergence'],
        href: 'https://ieeexplore.ieee.org/abstract/document/11113012/',
      },
      {
        title: 'OLearning: A Geo-Distributed System for Device-Cloud Collaborative Computing',
        venue: 'DASFAA 2025',
        date: 'Jan 25, 2025',
        authors: 'Min Fang, Zhihui Fu, Xiangmou Qu, Ruiguang Pei, Jun Wang, Lan Zhang',
        tags: ['Distributed Systems', 'Device-Cloud', 'Industry Track'],
        note: 'Oral, Industry Track',
      },
      {
        title: 'FedSA: A Unified Representation Learning via Semantic Anchors for Prototype-based Federated Learning',
        venue: 'AAAI 2025',
        date: 'Dec 10, 2024',
        authors:
          'Yanbing Zhou, Xiangmou Qu, Chenlong You, Jiyang Zhou, Jingyue Tang, Xin Zheng, Chunmao Cai, Yingbo Wu',
        tags: ['Federated Learning', 'Representation Learning', 'Semantic Anchors'],
        href: 'https://ojs.aaai.org/index.php/AAAI/article/view/34464',
        note: 'Oral',
      },
      {
        title: 'Voltran: Unlocking Trust and Confidentiality in Decentralized Federated Learning Aggregation',
        venue: 'IEEE TIFS 2024',
        date: 'Sep 24, 2024',
        authors: 'Hao Wang, Yichen Cai, Jun Wang, Chuan Ma, Chunpeng Ge, Xiangmou Qu, Lu Zhou',
        tags: ['Security', 'Trust', 'Decentralized FL'],
        href: 'https://ieeexplore.ieee.org/abstract/document/10703116/',
      },
    ],
  },
  activities: {
    id: 'activities',
    header: {
      eyebrow: 'Recent Activities',
      title: 'Updates',
    },
    items: [
      {
        date: 'Apr 27, 2026',
        title: 'TopoClaw development',
        body:
          'Participated in the development of TopoClaw, an all-scenario AI digital assistant for cross-device execution, social collaboration, and proactive assistance.',
        href: 'https://github.com/MadeAgents/TopoClaw',
      },
      {
        date: 'Sep 18, 2025',
        title: 'MobileUse accepted at NeurIPS 2025',
        body: 'Our work on hierarchical reflection-driven GUI agents was accepted at NeurIPS 2025.',
      },
      {
        date: 'Apr 1, 2025',
        title: 'MobileUse framework development',
        body:
          'Participated in the design and development of the mobile-use GUI multi-agent framework for autonomous mobile app operation.',
        href: 'https://github.com/MadeAgents/mobile-use',
      },
    ],
  },
  footer: [
    { icon: 'bookOpen', text: 'Last updated: April 27, 2026' },
    { icon: 'mapPin', text: 'Shenzhen · Chongqing · Research in motion' },
  ],
};
