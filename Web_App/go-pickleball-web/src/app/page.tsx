"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Court } from "./auth/court-registration/types";

export default function Home() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("/api/courts");
        if (response.ok) {
          const data = await response.json();
          setCourts(data);
        }
      } catch (error) {
        console.error("获取球场信息失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourts();
  }, []);

  // 只取前10个球场
  const topCourts = courts.slice(0, 10);

  return (
    <main className="min-h-screen bg-primary-light">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-r from-primary to-primary-yellow text-gray-900">
        <div className="absolute inset-0 bg-white opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
            匹克乐 Picklers
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-gray-800">
            帮助球友们找到合适的场地，找到约球的组织，合适的球拍，快乐匹克球
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courts"
              className="px-8 py-3 bg-primary-yellow text-primary font-semibold rounded-lg hover:bg-primary transition-colors border border-primary-yellow"
            >
              找球场
            </Link>
            <Link
              href="/auth/court-registration"
              className="px-8 py-3 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              找组织
            </Link>
          </div>
        </div>
      </section>

      {/* Courts Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-primary">精选球场</h2>
            </div>
            <Link
              href="/courts"
              className="px-4 py-2 bg-primary-yellow text-primary font-semibold rounded-full border border-primary-yellow hover:bg-primary transition-colors text-base"
            >
              查看更多
            </Link>
          </div>
          {isLoading ? (
            <div className="text-center text-primary">加载中...</div>
          ) : (
            <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary-yellow scrollbar-track-primary-light">
              {topCourts.map((court) => (
                <div
                  key={court._id}
                  className="min-w-[260px] max-w-[300px] bg-white rounded-xl shadow-md overflow-hidden border border-primary-yellow flex-shrink-0"
                >
                  {court.images && court.images[0] && (
                    <div className="relative h-36 w-full">
                      <Image
                        src={court.images[0]}
                        alt={court.name}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col items-start">
                    <h3 className="text-lg font-bold mb-2 text-primary">
                      {court.name}
                    </h3>
                    <span className="inline-block bg-primary-yellow text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {court.province} {court.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-center mt-8 gap-2">
            <Link
              href="/auth/court-registration"
              className="inline-block px-8 py-3 bg-primary-yellow text-primary font-semibold rounded-lg hover:bg-primary transition-colors border border-primary-yellow"
            >
              球场入驻，获得免费曝光
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-primary-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <h2 className="text-3xl font-bold text-primary">更多功能</h2>
            <span className="px-3 py-1 bg-primary-yellow text-primary text-sm rounded-full border border-primary font-medium">
              正在开发
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow border border-primary-light">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                找组织
              </h3>
              <p className="text-gray-700">
                欢迎球局运营者联系我们，提供约球群二维码，方便本地球友加群找组织
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow border border-primary-light">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                找好拍
              </h3>
              <p className="text-gray-700">
                欢迎球拍厂商联系我们，为球友推荐合适的球拍
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow border border-primary-light">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                DUPR城市排名
              </h3>
              <p className="text-gray-700">查看城市排名，找球友，找队友</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-primary-yellow">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">联系我们</h2>
          <div className="flex flex-col flex-wrap justify-center items-center gap-6 overflow-x-auto">
            {/* 小红书icon+文字 */}
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-primary text-base">小红书</span>
            </div>
            {/* 小红书二维码 */}
            {/* <Image
              src="/rednote.jpg"
              alt="小红书二维码"
              width={250}
              height={0}
              className="rounded-lg shadow object-contain"
              style={{ height: "auto", maxHeight: "200px" }}
            /> */}
            {/* 小红书ID */}
            <span className="text-xs text-primary min-w-[90px]">
              ID: Colin今天匹克球了吗
            </span>
            {/* 微信icon+文字 */}
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-primary text-base">微信</span>
            </div>
            {/* 微信二维码 */}
            {/* <Image
              src="/wechat.jpg"
              alt="微信二维码"
              width={160}
              height={0}
              className="rounded-lg shadow object-contain"
              style={{ height: "auto", maxHeight: "200px" }}
            /> */}
            {/* 微信ID */}
            <span className="text-xs text-primary min-w-[80px]">
              ID: ctlandu777
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
