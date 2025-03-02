# Go Pickleball

一款为匹克球爱好者打造的多端应用，致力于为匹克球运动爱好者提供全方位的服务平台。

## 项目简介

Go Pickleball 是基于 Taro 框架开发的跨端应用，目前主要支持微信小程序和 React Native 平台。项目旨在为匹克球爱好者提供一个集学习、交流、装备推荐于一体的综合性平台。

## 技术栈

- **Taro**: 基于 React 的开源跨端框架，版本 4.0.9
- **React**: 用于构建用户界面的 JavaScript 库，版本 18.0.0
- **TypeScript**: 添加了类型系统的 JavaScript 超集
- **Sass**: CSS 预处理器，用于样式开发

## 支持平台

- 微信小程序
- React Native

## 主要功能

### 1. 匹克球练习视频

- 专业教学视频
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

### 4. 约球论坛

- 球友交流平台
- 约球信息发布
- 经验心得分享
- 活动组织策划

## 开发环境配置

1. **环境要求**

```bash
node >= 14.0.0
npm >= 6.0.0
```

2. **安装依赖**

```bash
npm install
```

3. **开发命令**

微信小程序开发：

```bash
npm run dev:weapp
```

React Native 开发：

```bash
npm run dev:rn
```

4. **构建命令**

微信小程序构建：

```bash
npm run build:weapp
```

React Native 构建：

```bash
npm run build:rn
```

## 项目结构

```
├── config                 # 项目配置文件
├── src                    # 源码目录
│   ├── pages             # 页面文件目录
│   ├── components        # 公共组件目录
│   ├── assets            # 静态资源目录
│   ├── utils             # 工具函数目录
│   ├── app.config.ts     # 全局配置
│   ├── app.scss          # 全局样式
│   └── app.ts            # 项目入口文件
├── types                 # 类型定义文件
└── package.json          # 项目依赖配置文件
```

## 开发规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 规范
- 使用 Sass 进行样式开发
- 组件化开发

## 注意事项

1. 本项目目前主要针对微信小程序和 React Native 平台进行开发和维护
2. 建议在开发之前先了解 Taro 框架的基本使用方法
3. 注意微信小程序和 React Native 平台的差异性处理

## 贡献指南

欢迎提交 Issue 或 Pull Request 来帮助改进项目。在提交之前，请确保：

1. Issue 描述清晰具体
2. Pull Request 遵循项目代码规范
3. 更新相关文档

## 版本历史

- v1.0.0 - 项目初始化，支持微信小程序和 React Native 平台
