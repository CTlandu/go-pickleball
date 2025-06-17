"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CourtForm from "./components/CourtForm";
import { Court, CourtFormData } from "@/app/auth/court-registration/types";

export default function CourtRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [court, setCourt] = useState<Court | null>(null);
  const [editingCourt, setEditingCourt] = useState<Court | undefined>();
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string>("");

  useEffect(() => {
    // 检查登录状态并获取用户手机号
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (!response.ok) {
          router.push("/auth/login");
          return;
        }
        const data = await response.json();
        setUserPhone(data.phone);
        setIsLoading(false);
        // 获取该用户的球场信息
        fetchCourt();
      } catch (error) {
        console.error("验证登录状态失败:", error);
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchCourt = async () => {
    try {
      const res = await fetch("/api/courts/my-court");
      if (!res.ok) {
        if (res.status === 404) {
          // 如果球场不存在，这是正常的
          setCourt(null);
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setCourt(data);
      setEditingCourt(data);
    } catch (error: unknown) {
      console.error("获取球场数据失败:", error);
      if (error instanceof Error) {
        setMessage("获取球场信息失败：" + error.message);
      } else {
        setMessage("获取球场信息失败");
      }
    }
  };

  const handleSubmit = async (formData: CourtFormData) => {
    try {
      const url = editingCourt
        ? `/api/courts/${editingCourt._id}`
        : "/api/courts";
      const method = editingCourt ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          managerPhone: userPhone, // 添加管理员手机号
        }),
      });

      if (res.ok) {
        setMessage(editingCourt ? "球场信息更新成功！" : "球场信息添加成功！");
        fetchCourt();
        setEditingCourt(undefined);
      } else {
        const data = await res.json();
        setMessage((editingCourt ? "更新" : "添加") + "失败：" + data.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("提交出错：" + error.message);
      } else {
        setMessage("提交出错");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCourt(undefined);
  };

  const handleImageClick = (imageUrl: string) => {
    if (imageUrl && imageUrl.trim() !== "") {
      setSelectedImage(imageUrl);
    } else {
      console.warn("尝试查看无效的图片URL");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">我的球场</h1>
          <p className="text-sm text-gray-600 mt-2">
            当前登录手机号：{userPhone}
          </p>
        </div>

        {court && (
          <div className="mb-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">当前球场信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">球场名称：{court.name}</p>
                <p className="text-gray-600">
                  地址：{court.province} {court.city} {court.district}{" "}
                  {court.address}
                </p>
                <p className="text-gray-600">营业时间：{court.openHours}</p>
                <p className="text-gray-600">价格：{court.price}</p>
              </div>
              <div>
                <p className="text-gray-600">
                  联系电话：{court.contact.telephone}
                </p>
                <p className="text-gray-600">微信：{court.contact.wechat}</p>
                <p className="text-gray-600">小红书：{court.contact.rednote}</p>
                <p className="text-gray-600">美团：{court.contact.meituan}</p>
              </div>
            </div>
            {court.images && court.images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">球场图片</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {court.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-40 cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        src={image}
                        alt={`球场图片 ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">添加新球场</h2>
          <CourtForm
            editingCourt={editingCourt}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        </div>

        {/* 图片查看模态框 */}
        {selectedImage && selectedImage.trim() !== "" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="球场图片"
                width={800}
                height={600}
                className="object-contain"
                unoptimized={selectedImage.startsWith("data:")}
              />
              <button
                className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-8 h-8 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="fixed bottom-4 right-4 p-4 rounded-md bg-green-100 text-green-700 shadow-lg">
            {message}
            <button
              className="ml-3 text-sm text-green-800"
              onClick={() => setMessage("")}
            >
              关闭
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
