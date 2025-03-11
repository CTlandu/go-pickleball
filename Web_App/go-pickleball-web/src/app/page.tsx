import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1464] to-[#40B37C] text-white">
      {/* Hero Section with Logo Background */}
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <Image
            src="/go-pickleball-logo.png"
            alt="Background Logo"
            width={400}
            height={200}
            className="object-contain"
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">欢迎来到 Go Pickleball</h1>
            <p className="text-xl mb-8">你的匹克球运动伙伴</p>
            <Link
              href="/drill"
              className="inline-block bg-[#F7D794] text-[#1B1464] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
            >
              开始练球
            </Link>
          </div>

          {/* 功能特点 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">你可以在这里：</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg hover:bg-opacity-30 transition-all cursor-pointer border border-white/10">
              <h3 className="text-xl font-bold mb-2 text-[#6be739]">练球</h3>
              <p className="text-black/90 text-base">
                查看最新最全的练球视频，和球友一起跟练。从基础到进阶，专业教练在线指导，让你的技术快速提升！
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg hover:bg-opacity-30 transition-all cursor-pointer border border-white/10">
              <h3 className="text-xl font-bold mb-2 text-[#6be739]">找球场</h3>
              <p className="text-black/90 text-base">
                最全的国内球场信息，寻找最适合你的球场吧！场地设施、价格、评价一目了然，轻松找到理想场地。
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg hover:bg-opacity-30 transition-all cursor-pointer border border-white/10">
              <h3 className="text-xl font-bold mb-2 text-[#6be739]">排名</h3>
              <p className="text-black/90 text-base">
                上传你的DUPR分数，进入城市排名，大家一起努力！记录你的进步，挑战更高水平的对手。
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg hover:bg-opacity-30 transition-all cursor-pointer border border-white/10">
              <h3 className="text-xl font-bold mb-2 text-[#6be739]">找好拍</h3>
              <p className="text-black/90 text-base">
                看看大家对球拍有哪些推荐和种草。专业测评、用户体验分享，助你找到最适合的装备。
              </p>
            </div>
          </div>

          {/* 开始使用 */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">准备好了吗？</h2>
            <div className="flex gap-4 justify-center">
              <Link
                href="/drill"
                className="bg-[#40B37C] px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
              >
                开始练习
              </Link>
              <Link
                href="/courts"
                className="bg-[#F7D794] text-[#1B1464] px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
              >
                查找球场
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
