"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Court, CourtFormData } from "../types";

interface CourtFormProps {
  editingCourt?: Court;
  onSubmit: (data: CourtFormData) => Promise<void>;
  onCancel: () => void;
}

export default function CourtForm({
  editingCourt,
  onSubmit,
  onCancel,
}: CourtFormProps) {
  const [formData, setFormData] = useState<CourtFormData>({
    name: editingCourt?.name || "",
    province: editingCourt?.province || "",
    city: editingCourt?.city || "",
    district: editingCourt?.district || "",
    address: editingCourt?.address || "",
    contact: {
      telephone: editingCourt?.contact?.telephone || "",
      wechat: editingCourt?.contact?.wechat || "",
      rednote: editingCourt?.contact?.rednote || "",
      meituan: editingCourt?.contact?.meituan || "",
    },
    openHours: editingCourt?.openHours || "",
    price: editingCourt?.price || "",
    images: editingCourt?.images || [],
  });

  // 区分已有图片URL和新上传的Base64图片
  const [existingImages, setExistingImages] = useState<string[]>(
    editingCourt?.images || []
  );
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  // 合并后的所有预览图片
  const allPreviewImages = [...existingImages, ...newImagePreviews];

  useEffect(() => {
    if (editingCourt) {
      setFormData({
        name: editingCourt.name || "",
        province: editingCourt.province || "",
        city: editingCourt.city || "",
        district: editingCourt.district || "",
        address: editingCourt.address || "",
        contact: {
          telephone: editingCourt.contact?.telephone || "",
          wechat: editingCourt.contact?.wechat || "",
          rednote: editingCourt.contact?.rednote || "",
          meituan: editingCourt.contact?.meituan || "",
        },
        openHours: editingCourt.openHours || "",
        price: editingCourt.price || "",
        images: editingCourt.images || [],
      });

      setExistingImages(editingCourt.images || []);
      setNewImagePreviews([]);
    }
  }, [editingCourt]);

  // 清理函数，防止内存泄漏
  useEffect(() => {
    return () => {
      // 组件卸载时清理内存中的图片预览数据
      setNewImagePreviews([]);
    };
  }, []);

  // 将File转换为Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      try {
        // 将文件转换为Base64字符串
        const base64Promises = newFiles.map((file) => fileToBase64(file));
        const base64Results = await Promise.all(base64Promises);

        // 更新预览图片
        setNewImagePreviews((prev) => [...prev, ...base64Results]);

        // 更新表单数据
        setFormData((prev) => ({
          ...prev,
          images: [...existingImages, ...base64Results],
        }));
      } catch (error) {
        console.error("转换图片失败", error);
      }
    }
  };

  const removeImage = (index: number) => {
    if (index < existingImages.length) {
      // 移除已有图片
      const updatedExistingImages = existingImages.filter(
        (_, i) => i !== index
      );
      setExistingImages(updatedExistingImages);

      // 更新表单数据
      setFormData((prev) => ({
        ...prev,
        images: [...updatedExistingImages, ...newImagePreviews],
      }));
    } else {
      // 移除新上传的图片
      const newIndex = index - existingImages.length;
      const updatedNewPreviews = newImagePreviews.filter(
        (_, i) => i !== newIndex
      );
      setNewImagePreviews(updatedNewPreviews);

      // 同时移除对应的File对象
      setFormData((prev) => ({
        ...prev,
        images: [...existingImages, ...updatedNewPreviews],
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  // 检查图片URL是否有效
  const isValidImageSrc = (src: string) => {
    return src && src.trim() !== "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          球场名称
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-900"
          >
            省份
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-900"
          >
            城市
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-900"
          >
            区县
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-900"
        >
          详细地址
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact.telephone"
            className="block text-sm font-medium text-gray-900"
          >
            电话
          </label>
          <input
            type="text"
            id="contact.telephone"
            name="contact.telephone"
            value={formData.contact.telephone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="contact.wechat"
            className="block text-sm font-medium text-gray-900"
          >
            微信
          </label>
          <input
            type="text"
            id="contact.wechat"
            name="contact.wechat"
            value={formData.contact.wechat}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="contact.rednote"
            className="block text-sm font-medium text-gray-900"
          >
            小红书
          </label>
          <input
            type="text"
            id="contact.rednote"
            name="contact.rednote"
            value={formData.contact.rednote}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="contact.meituan"
            className="block text-sm font-medium text-gray-900"
          >
            美团
          </label>
          <input
            type="text"
            id="contact.meituan"
            name="contact.meituan"
            value={formData.contact.meituan}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="openHours"
          className="block text-sm font-medium text-gray-900"
        >
          营业时间
        </label>
        <input
          type="text"
          id="openHours"
          name="openHours"
          value={formData.openHours}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-900"
        >
          价格信息
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          球场图片
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />

        {allPreviewImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {allPreviewImages
              .filter((url) => isValidImageSrc(url))
              .map((url, index) => (
                <div key={index} className="relative">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                    {/* 使用unoptimized避免Next.js的图片优化导致的问题 */}
                    <Image
                      src={url}
                      alt={`球场图片 ${index + 1}`}
                      width={200}
                      height={150}
                      className="object-cover"
                      unoptimized={url.startsWith("data:")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {editingCourt ? "更新" : "添加"}
        </button>
      </div>
    </form>
  );
}
