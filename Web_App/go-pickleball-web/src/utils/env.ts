// 环境配置工具

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export const ENV = {
  // API配置
  API_URL: process.env.NEXT_PUBLIC_API_URL,

  // 数据库配置
  MONGODB_URI: process.env.MONGODB_URI,

  // 调试配置
  DEBUG: process.env.NEXT_PUBLIC_DEBUG === "true",

  // 环境标识
  ENV: process.env.NEXT_PUBLIC_ENV,
};

// 开发环境特定功能
export const enableDevTools = () => {
  if (isDevelopment) {
    // 开发环境下的额外配置
    console.log("开发模式已启用");
    console.log("环境配置:", ENV);
  }
};

// 生产环境特定功能
export const enableProdFeatures = () => {
  if (isProduction) {
    // 生产环境下的额外配置
    console.log("生产模式已启用");

    // 禁用开发工具和日志
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};
