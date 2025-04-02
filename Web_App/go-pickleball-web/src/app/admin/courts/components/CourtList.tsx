"use client";
import Image from "next/image";
import { Court } from "../types";

interface CourtListProps {
  courts: Court[];
  onEdit: (court: Court) => void;
  onDelete: (id: string) => void;
  onImageClick: (image: string) => void;
}

export default function CourtList({
  courts,
  onEdit,
  onDelete,
  onImageClick,
}: CourtListProps) {
  const handleEdit = (court: Court) => {
    console.log("CourtList - 编辑球场:", court);
    onEdit(court);
  };

  // 判断图片URL是否有效
  const isValidImageUrl = (url: string) => {
    return url && url.trim() !== "";
  };

  // 判断是否是Base64格式的图片
  const isBase64Image = (url: string): boolean => {
    return Boolean(url && url.startsWith("data:image/"));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">已添加的球场</h2>
      <div className="grid grid-cols-1 gap-4">
        {courts.map((court) => (
          <div key={court._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {court.name}
                </h3>
                <p className="text-gray-800 mt-1">
                  {court.province} {court.city} {court.district}
                </p>
                <p className="text-gray-800 mt-1">{court.address}</p>

                <div className="mt-3">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">营业时间:</span>{" "}
                    {court.openHours}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">价格:</span> {court.price}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900">联系方式:</p>
                  {court.contact.telephone && (
                    <p className="text-sm text-gray-800">
                      电话: {court.contact.telephone}
                    </p>
                  )}
                  {court.contact.wechat && (
                    <p className="text-sm text-gray-800">
                      微信: {court.contact.wechat}
                    </p>
                  )}
                  {court.contact.rednote && (
                    <p className="text-sm text-gray-800">
                      小红书: {court.contact.rednote}
                    </p>
                  )}
                  {court.contact.meituan && (
                    <p className="text-sm text-gray-800">
                      美团: {court.contact.meituan}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => handleEdit(court)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => onDelete(court._id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>

            {court.images && court.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {court.images
                  .filter((image) => isValidImageUrl(image))
                  .map((image, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-md overflow-hidden"
                      onClick={() => onImageClick(image)}
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={image}
                          alt={`${court.name}的图片 ${index + 1}`}
                          width={150}
                          height={100}
                          className="object-cover w-full h-full"
                          unoptimized={isBase64Image(image)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
