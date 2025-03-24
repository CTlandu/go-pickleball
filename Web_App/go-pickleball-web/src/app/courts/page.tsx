"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Court {
  _id: string;
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  contact: {
    telephone: string;
    wechat: string;
    rednote: string;
    meituan: string;
  };
  openHours: string;
  price: string;
  images: string[];
}

export default function CourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const res = await fetch("/api/courts");
      const data = await res.json();
      setCourts(data);
    } catch (error) {
      console.error("获取球场信息失败:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">全国匹克球场</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div
              key={court._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* 图片展示 */}
              <div 
                className="relative h-48 cursor-pointer" 
                onClick={() => court.images && court.images.length > 0 && court.images[0] && setSelectedImage(court.images[0])}
              >
                {court.images && court.images.length > 0 && court.images[0] ? (
                  <Image
                    src={court.images[0]}
                    alt={court.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 球场信息 */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{court.name}</h2>
                <p className="text-gray-600 mb-2">
                  {court.province} {court.city} {court.district}
                </p>
                <p className="text-gray-600 mb-2">{court.address}</p>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">营业时间：</span>
                    {court.openHours}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">价格：</span>
                    {court.price}
                  </p>
                </div>

                {/* 联系方式 */}
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <h3 className="font-semibold mb-2">联系方式</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {court.contact.telephone && (
                      <p className="text-gray-600">
                        <span className="font-medium">电话：</span>
                        {court.contact.telephone}
                      </p>
                    )}
                    {court.contact.wechat && (
                      <p className="text-gray-600">
                        <span className="font-medium">微信：</span>
                        {court.contact.wechat}
                      </p>
                    )}
                    {court.contact.rednote && (
                      <p className="text-gray-600">
                        <span className="font-medium">小红书：</span>
                        {court.contact.rednote}
                      </p>
                    )}
                    {court.contact.meituan && (
                      <p className="text-gray-600">
                        <span className="font-medium">美团：</span>
                        {court.contact.meituan}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 图片查看模态框 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="球场图片"
              width={800}
              height={600}
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
