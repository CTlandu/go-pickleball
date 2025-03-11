
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1464] to-[#40B37C] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            欢迎来到 Go Pickleball
          </h1>
          <p className="text-xl mb-8">
            你的匹克球运动伙伴
          </p>
          <Link 
            href="/drill" 
            className="inline-block bg-[#F7D794] text-[#1B1464] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
          >
            开始练球
          </Link>
        </div>

        {/* 功能特点 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">专业训练指导</h3>
            <p>系统化的练习方案，助你快速提升技术水平</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">找寻球场</h3>
            <p>轻松查找附近球场，约球更便捷</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">排名系统</h3>
            <p>记录你的进步，挑战更高水平</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">社区互动</h3>
            <p>结识志同道合的球友，分享学习心得</p>
          </div>
        </div>

        {/* 开始使用 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">准备好了吗？</h2>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/drill" 
              className="bg-[#40B37C] px-6 py-2 rounded-full hover:bg-opacity-90"
            >
              开始练习
            </Link>
            <Link 
              href="/courts" 
              className="bg-[#F7D794] text-[#1B1464] px-6 py-2 rounded-full hover:bg-opacity-90"
            >
              查找球场
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
