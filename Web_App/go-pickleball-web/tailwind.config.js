/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#15ad3d", // 浅绿色
          light: "#DCFFEB", // 更浅的绿色
          yellow: "#FFF9C4", // 浅黄色
          white: "#FFFFFF",
        },
        // 你也可以自定义 secondary, accent 等
      },
    },
  },
  plugins: [],
  // 确保在生产环境中也应用样式
  important: true,
  // 禁用 JIT 模式，使用传统模式
  mode: "jit",
};
