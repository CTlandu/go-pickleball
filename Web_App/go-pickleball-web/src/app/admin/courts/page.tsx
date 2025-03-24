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

interface CourtFormData {
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

export default function AdminCourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [formData, setFormData] = useState<CourtFormData>({
    name: "",
    province: "",
    city: "",
    district: "",
    address: "",
    contact: {
      telephone: "",
      wechat: "",
      rednote: "",
      meituan: "",
    },
    openHours: "",
    price: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previewUrls.length > 9) {
      setMessage("最多只能上传9张图片");
      return;
    }

    const newFiles = files.slice(0, 9 - previewUrls.length);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // 创建预览URL
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const res = await fetch("/api/courts");
      const data = await res.json();
      setCourts(data);
    } catch (error: any) {
      setMessage("获取球场信息失败：" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (court: Court) => {
    setEditingId(court._id);
    setFormData({
      name: court.name,
      province: court.province,
      city: court.city,
      district: court.district,
      address: court.address,
      contact: court.contact,
      openHours: court.openHours,
      price: court.price,
      images: court.images || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定要删除这个球场吗？")) return;

    try {
      const res = await fetch(`/api/courts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("球场删除成功");
        fetchCourts();
      } else {
        const data = await res.json();
        setMessage("删除失败：" + data.error);
      }
    } catch (error: any) {
      setMessage("删除出错：" + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 处理新上传的图片
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          return data.url;
        })
      );

      const courtData = {
        ...formData,
        images: [...formData.images, ...imageUrls],
      };

      const url = editingId ? `/api/courts/${editingId}` : "/api/courts";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courtData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(editingId ? "球场信息更新成功！" : "球场信息添加成功！");
        fetchCourts();
        resetForm();
      } else {
        setMessage((editingId ? "更新" : "添加") + "失败：" + data.error);
      }
    } catch (error: any) {
      setMessage("提交出错：" + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      province: "",
      city: "",
      district: "",
      address: "",
      contact: {
        telephone: "",
        wechat: "",
        rednote: "",
        meituan: "",
      },
      openHours: "",
      price: "",
      images: [],
    });
    setEditingId(null);
    setImageFiles([]);
    setPreviewUrls([]);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "编辑球场信息" : "添加新球场"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              球场名称
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              省份
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              城市
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              区县
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              详细地址
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              营业时间
            </label>
            <input
              type="text"
              name="openHours"
              value={formData.openHours}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              价格
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              电话
            </label>
            <input
              type="text"
              name="contact.telephone"
              value={formData.contact.telephone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              微信
            </label>
            <input
              type="text"
              name="contact.wechat"
              value={formData.contact.wechat}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              小红书
            </label>
            <input
              type="text"
              name="contact.rednote"
              value={formData.contact.rednote}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              美团
            </label>
            <input
              type="text"
              name="contact.meituan"
              value={formData.contact.meituan}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              上传图片
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative h-24">
                    <Image
                      src={url}
                      alt={`预览图片 ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-2/3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {editingId ? "更新球场信息" : "添加球场"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-1/4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              取消编辑
            </button>
          )}
        </div>
      </form>

      {/* 球场列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">已添加的球场</h2>
        <div className="grid grid-cols-1 gap-4">
          {courts.map((court) => (
            <div key={court._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{court.name}</h3>
                  <p className="text-gray-600">
                    {court.province} {court.city} {court.district}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(court)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(court._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    删除
                  </button>
                </div>
              </div>

              {/* 图片预览 */}
              {court.images && court.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {court.images.map((image, index) =>
                    image ? (
                      <div
                        key={index}
                        className="relative h-24 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`${court.name} 图片 ${index + 1}`}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 768px) 33vw, 20vw"
                        />
                      </div>
                    ) : null
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">地址：</span>
                    {court.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">营业时间：</span>
                    {court.openHours}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">价格：</span>
                    {court.price}
                  </p>
                </div>
                <div>
                  {court.contact.telephone && (
                    <p className="text-gray-600">
                      <span className="font-semibold">电话：</span>
                      {court.contact.telephone}
                    </p>
                  )}
                  {court.contact.wechat && (
                    <p className="text-gray-600">
                      <span className="font-semibold">微信：</span>
                      {court.contact.wechat}
                    </p>
                  )}
                  {court.contact.rednote && (
                    <p className="text-gray-600">
                      <span className="font-semibold">小红书：</span>
                      {court.contact.rednote}
                    </p>
                  )}
                  {court.contact.meituan && (
                    <p className="text-gray-600">
                      <span className="font-semibold">美团：</span>
                      {court.contact.meituan}
                    </p>
                  )}
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
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-8 h-8 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="fixed bottom-4 right-4 p-4 rounded-md bg-green-100 text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}
