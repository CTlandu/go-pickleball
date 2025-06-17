"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CourtRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查登录状态
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (!response.ok) {
          // 如果未登录，重定向到登录页
          router.push("/auth/login");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error("验证登录状态失败:", error);
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            球场信息录入
          </h1>
          <p className="text-gray-600">登录成功！这里将用于录入球场信息。</p>
        </div>
      </div>
    </div>
  );
}
