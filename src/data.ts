export type Publication = {
  title: string;
  venue: string;
  date: string;
  authors: string;
  tags: string[];
  href?: string;
  note?: string;
};

export const interests = [
  'GUI Agents',
  'Mobile Agents',
  'Multi-Agent Collaboration',
  'Personalized Agents',
  'Federated Learning',
  'Edge-Cloud Computing',
  'Recommender Systems',
];

export const publications: Publication[] = [
  {
    title:
      'ColorBench: Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks',
    venue: 'WWW 2026',
    date: 'Jan 13, 2026',
    authors:
      'Yuanyi Song, Heyuan Huang, Qiqiang Lin, Yin Zhao, Xiangmou Qu, Jun Wang, Xingyu Lou, Weiwen Liu, Zhuosheng Zhang, Jun Wang, Yong Yu, Weinan Zhang, Zhaoxiang Wang',
    tags: ['Benchmarking', 'Mobile Agents', 'Long-Horizon Tasks'],
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
];

export const activities = [
  {
    date: 'Sep 18, 2025',
    title: 'MobileUse accepted at NeurIPS 2025',
    body: 'Our work on hierarchical reflection-driven GUI agents was accepted at NeurIPS 2025.',
  },
  {
    date: 'Apr 1, 2025',
    title: 'MobileUse framework development',
    body: 'Participated in the design and development of the mobile-use GUI multi-agent framework for autonomous mobile app operation.',
    href: 'https://github.com/MadeAgents/mobile-use',
  },
];

export const links = [
  { label: 'GitHub', href: 'https://github.com/lokinko' },
  { label: 'Email', href: 'mailto:lokinko.cs@gmail.com' },
  { label: 'Zhihu', href: 'https://www.zhihu.com/people/lokinko' },
];
