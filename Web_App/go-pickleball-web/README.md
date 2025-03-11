# Go Pickleball Web App

一款为匹克球爱好者打造的移动端网页应用，专注于提供流畅的手机端浏览体验。

## 项目简介

Go Pickleball Web App 是基于 Next.js 框架开发的移动优先的网页应用，采用响应式设计，重点优化手机端用户体验。项目与微信小程序版本共享核心功能，为匹克球爱好者提供全方位的在线服务。

## 技术栈

- **Next.js**: React 框架，用于构建现代化的 Web 应用
- **TypeScript**: 添加类型系统的 JavaScript 超集
- **Tailwind CSS**: 原子化 CSS 框架，用于快速构建响应式界面
- **React Query**: 数据请求和缓存管理
- **Zustand**: 轻量级状态管理库

## 主要功能

### 1. 匹克球练习视频

- 专业教学视频（支持在线播放）
- 技术动作分解
- 战术讲解
- 比赛技巧分享

### 2. 城市排行榜

- 各城市匹克球活跃度排名
- 场地数量统计
- 赛事活动信息
- 城市特色场地推荐

### 3. 球拍排行榜

- 热门球拍推荐
- 球拍参数对比
- 用户评价与点评
- 价格区间对比

### 4. 球场信息

- 球场位置查询
- 场地预订功能
- 场地评价系统
- 周边配套信息

## 开发规范

1. **移动端优先**

   - 以手机端显示为主要设计目标
   - 使用响应式设计确保其他设备也能正常访问
   - 优化触摸交互体验

2. **性能优化**

   - 图片懒加载
   - 路由预加载
   - 组件按需加载
   - 资源压缩优化

3. **代码规范**
   - 使用 TypeScript 进行开发
   - 遵循 ESLint 规范
   - 组件化开发
   - 统一的代码风格

## 项目结构

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 开发计划

### 第一阶段：基础框架搭建

- [x] 项目初始化
- [ ] 路由规划
- [ ] 基础组件库建设
- [ ] 移动端适配

### 第二阶段：核心功能开发

- [ ] 视频播放系统
- [ ] 排行榜系统
- [ ] 球场信息系统
- [ ] 用户系统

### 第三阶段：性能优化

- [ ] 首屏加载优化
- [ ] 图片加载优化
- [ ] SEO 优化
- [ ] 缓存策略实现

## 部署说明

项目使用 Vercel 进行部署，支持自动化部署流程。每次推送到 main 分支会自动触发构建和部署。

## 环境要求

- Node.js >= 20.0.0
- npm >= 10.0.0

## 本地开发

````bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
