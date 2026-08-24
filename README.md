# Xiangmou Qu · Academic Homepage

[lokinko.github.io](https://lokinko.github.io/) 的源码仓库。这是一个基于 Astro 的静态学术主页，用于展示个人简介、动态、论文、项目和工作经历，并通过 GitHub Actions 自动部署到 GitHub Pages。

## 功能概览

- 响应式个人主页、论文列表、项目列表和详情页
- Markdown 内容管理，无需数据库或后台服务
- 在 `bio.md` 中声明可复用的 CCF、Oral 等论文标签
- 相同标签自动使用一致颜色，支持任意数量和任意名称的标签
- Google Scholar 总引用数定时更新
- 自动生成 sitemap、canonical URL、Open Graph 和结构化数据
- GitHub Pages 自动构建与部署

## 技术栈

- [Astro](https://astro.build/)：静态站点生成与内容集合
- [Tailwind CSS](https://tailwindcss.com/)：布局工具类
- [Fontsource](https://fontsource.org/)：本地托管 Inter 与 JetBrains Mono 字体
- [GitHub Actions](https://github.com/features/actions)：引用数更新和 Pages 部署

## 目录结构

```text
.
├─ .github/workflows/
│  ├─ deploy.yml                    # 构建并部署到 GitHub Pages
│  └─ update-scholar-citations.yml  # 定时刷新 Google Scholar 引用数
├─ public/                           # 头像、favicon、robots.txt 等静态资源
├─ scripts/
│  ├─ update-scholar-citations.mjs  # Scholar 引用数更新脚本
│  └─ remark-tier-tags.test.mjs     # 论文标签单元测试
├─ src/
│  ├─ assets/                        # SVG 图标与加载器
│  ├─ components/                    # 导航、侧栏、列表卡片等组件
│  ├─ content/
│  │  ├─ bio.md                      # 首页正文、动态、论文摘要和项目摘要
│  │  ├─ publications/               # 论文详情数据
│  │  └─ projects/                   # 项目详情数据
│  ├─ layouts/                       # 页面、列表页和详情页布局
│  ├─ pages/                         # Astro 路由
│  ├─ styles/global.css              # 全局视觉样式
│  ├─ utils/                         # 内容适配和 Markdown 标签插件
│  ├─ config.ts                      # 网站、导航、社交链接和页面配置
│  └─ content.config.ts              # 内容集合 Schema
├─ astro.config.mjs
└─ package.json
```

## 本地开发

环境要求：Node.js 22.12 或更高版本，建议使用 Node.js 24。

```bash
npm install
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321) 预览。开发服务器会监听文件变化并自动刷新页面。

生产构建与本地预览：

```bash
npm run build
npm run preview
```

`npm run preview` 默认使用构建后的 `dist/`，适合发布前检查生产结果。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生成生产站点到 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm test` | 运行论文标签插件测试 |
| `npm run update:scholar` | 手动刷新 Scholar 引用数 |

## 内容维护

### 个人信息与首页

编辑 [`src/content/bio.md`](src/content/bio.md)。文件头部的 frontmatter 管理侧栏和经历：

```yaml
---
name: "Xiangmou Qu"
avatar: "avatar.jpg"
shortBio: "Building intelligent systems..."
institution: "OPPO Research Institute, Shenzhen, China"
internship:
  - role: "Machine Learning Algorithm Engineer"
    company: "OPPO Research Institute"
    period: "Present"
    description: "GUI agents, collaborative intelligence..."
---
```

头像文件放在 `public/`，`avatar` 只填写相对于 `public/` 的路径。首页的 News、Publications 和 Projects 也直接维护在同一个 `bio.md` 中，避免动态内容存在两个副本。旧的 `/news` 路径会永久跳转到首页的 `#news` 区域。

### 论文标签

在 `bio.md` 的论文 venue 前加入标签标记：

```md
{{tags: CCF-A}}*ACM MM*, 2026.
{{tags: CCF-A, Oral}}*WWW*, 2026.
{{tags: Oral, Industry Track}}*DASFAA*, 2025.
```

规则：

- 多个标签使用英文逗号分隔。
- 标签名称不需要预先注册；新增名称会自动得到颜色。
- 颜色根据规范化后的标签名在构建时计算，因此同名标签始终同色。
- 标签比较不区分大小写，重复标签会自动去重。
- 该语法由 `src/utils/remarkTierTags.mjs` 在构建时转换，不会增加浏览器端 JavaScript。

### 论文详情

在 `src/content/publications/` 中新增 Markdown 文件，文件名会成为详情页 URL：

```yaml
---
title: "Paper title"
author: "Author A, Author B"
date: "2026-04-13"
journal: "ACM MM 2026"
external_url: "https://arxiv.org/abs/..."
description: "One-sentence summary."
tags: ["Federated Learning", "Recommendation"]
image: "optional-image.png"
---

正文用于论文详情页的补充介绍。
```

例如 `src/content/publications/example.md` 会生成 `/publications/example`。日期推荐使用 `YYYY-MM-DD`，列表会按日期从新到旧排序。`external_url`、`image` 和正文均可省略。

### 项目详情

项目文件位于 `src/content/projects/`，格式与论文类似：

```yaml
---
title: "Project name"
description: "Short project summary."
tags: ["Agent", "Open Source"]
external_url: "https://github.com/owner/repository"
image: "optional-image.png"
---

项目详情正文。
```

文件名同样决定 URL，例如 `mobileuse.md` 对应 `/projects/mobileuse`。

### 网站信息、导航与社交链接

统一编辑 `src/config.ts`：

- `SITE`：域名、作者、描述、标题、favicon 和语言
- `NAV_LINKS`：顶部导航
- `SOCIALS`：侧栏社交链接及图标
- `PAGES`：各列表页的标题和描述

新增社交图标时，将 SVG 放入 `src/assets/icons/`，并在 `SOCIALS` 的 `icon` 字段填写 SVG 文件名（不含扩展名）。

## Google Scholar 引用数

首页引用数保存在 `bio.md` 的以下标记中：

```html
<span data-scholar-citations>178</span>
```

`.github/workflows/update-scholar-citations.yml` 每 12 小时执行一次，也支持在 Actions 页面手动运行。更新流程会：

1. 尝试读取 Google Scholar 个人主页。
2. 主请求失败时使用备用查询服务。
3. 仅在新数值更大时更新 `bio.md`，避免引用数意外回退。
4. 提交变化并触发 Pages 重新部署。

本地手动运行：

```bash
npm run update:scholar
```

可通过环境变量覆盖 Scholar 用户 ID 或备用服务地址：

```bash
SCHOLAR_ID=your_scholar_id npm run update:scholar
SCHOLAR_FALLBACK_URL=https://example.com/api npm run update:scholar
```

在 PowerShell 中请使用 `$env:SCHOLAR_ID = "..."` 的形式设置环境变量。

## 测试与发布前检查

提交前建议依次运行：

```bash
npm test
npm run build
git diff --check
```

构建成功后，应至少检查首页、论文列表、一个论文详情、项目列表、一个项目详情以及移动端导航。

## GitHub Pages 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动：

1. 使用 `npm ci` 安装锁定依赖。
2. 执行 `npm run build`。
3. 上传 `dist/`。
4. 部署到 GitHub Pages。

首次部署时，需要在仓库 **Settings → Pages → Build and deployment** 中将 Source 设置为 **GitHub Actions**。自定义域名时，还需要同步修改 `src/config.ts` 中的 `SITE.website` 和 `astro.config.mjs` 中的 `site`。

## 设计与实现说明

- 站点为纯静态输出，不依赖运行时服务器。
- 字体文件由 Fontsource 打包进站点，不依赖外部字体 CDN。
- Markdown 标签、内容集合和详情路由都在构建时处理。
- `public/` 中的文件会原样复制到站点根路径。
- `dist/`、`.astro/` 和 `node_modules/` 是生成目录，不应提交。

## License 与来源

项目沿用 MIT License，详见 [`LICENSE`](LICENSE)。页面结构基于 MIT 授权的 Academic Portfolio Astro 模板，并参考了 [TonybotNi/tonybotni.github.io](https://github.com/TonybotNi/tonybotni.github.io) 的学术主页呈现方式；当前内容、配置与自动化脚本已按本仓库需求重构。
