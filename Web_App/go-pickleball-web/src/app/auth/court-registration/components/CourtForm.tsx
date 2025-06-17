"use client";
import { useState, useEffect } from "react";
import { Court, CourtFormData } from "../types";

interface CourtFormProps {
  editingCourt?: Court;
  onSubmit: (data: CourtFormData) => void;
  onCancel: () => void;
}

export default function CourtForm({
  editingCourt,
  onSubmit,
  onCancel,
}: CourtFormProps) {
  const [formData, setFormData] = useState<CourtFormData>({
    name: "",
    province: "",
    city: "",
    district: "",
    address: "",
    openHours: "",
    price: "",
    contact: {
      telephone: "",
      telephone2: "",
      wechat: "",
      rednote: "",
      meituan: "",
    },
    images: [],
    managerName: "",
    certificates: {
      businessLicense: "",
      managerCertificate: "",
      otherCertificates: [],
    },
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [certificateFiles, setCertificateFiles] = useState<{
    businessLicense?: File;
    managerCertificate?: File;
    otherCertificates: File[];
  }>({
    otherCertificates: [],
  });
  const [certificatePreviewUrls, setCertificatePreviewUrls] = useState<{
    businessLicense?: string;
    managerCertificate?: string;
    otherCertificates: string[];
  }>({
    otherCertificates: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingCourt) {
      setFormData({
        name: editingCourt.name,
        province: editingCourt.province,
        city: editingCourt.city,
        district: editingCourt.district,
        address: editingCourt.address,
        openHours: editingCourt.openHours,
        price: editingCourt.price,
        contact: { ...editingCourt.contact },
        images: editingCourt.images,
        managerName: editingCourt.managerName,
        certificates: { ...editingCourt.certificates },
      });
      setPreviewUrls(editingCourt.images);
      setCertificatePreviewUrls({
        businessLicense: editingCourt.certificates.businessLicense,
        managerCertificate: editingCourt.certificates.managerCertificate,
        otherCertificates: editingCourt.certificates.otherCertificates || [],
      });
    }
  }, [editingCourt]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);

      // Create preview URLs
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleCertificateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "businessLicense" | "managerCertificate" | "otherCertificates"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("证书上传失败");
        }

        const data = await response.json();

        if (type === "otherCertificates") {
          setFormData((prev) => ({
            ...prev,
            certificates: {
              ...prev.certificates,
              otherCertificates: [
                ...(prev.certificates.otherCertificates || []),
                data.url,
              ],
            },
          }));
          setCertificatePreviewUrls((prev) => ({
            ...prev,
            otherCertificates: [...prev.otherCertificates, data.url],
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            certificates: {
              ...prev.certificates,
              [type]: data.url,
            },
          }));
          setCertificatePreviewUrls((prev) => ({
            ...prev,
            [type]: data.url,
          }));
        }
      } catch (error) {
        console.error("证书上传失败:", error);
        alert("证书上传失败，请重试");
      }
    }
  };

  const removeCertificate = (
    type: "businessLicense" | "managerCertificate" | "otherCertificates",
    index?: number
  ) => {
    if (type === "otherCertificates" && index !== undefined) {
      setFormData((prev) => ({
        ...prev,
        certificates: {
          ...prev.certificates,
          otherCertificates:
            prev.certificates.otherCertificates?.filter(
              (_, i) => i !== index
            ) || [],
        },
      }));
      setCertificatePreviewUrls((prev) => ({
        ...prev,
        otherCertificates: prev.otherCertificates.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        certificates: {
          ...prev.certificates,
          [type]: undefined,
        },
      }));
      setCertificatePreviewUrls((prev) => ({
        ...prev,
        [type]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images first if there are new ones
      const uploadedImageUrls = [...formData.images];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("图片上传失败");
          }

          const data = await response.json();
          uploadedImageUrls.push(data.url);
        }
      }

      // Submit form with all data
      onSubmit({
        ...formData,
        images: uploadedImageUrls,
      });
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4 py-4">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            球场负责人姓名
          </label>
          <input
            type="text"
            name="managerName"
            value={formData.managerName}
            onChange={handleInputChange}
            required
            placeholder="请输入球场负责人姓名"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            球场名称
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="例如：星光匹克球馆"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            营业时间
          </label>
          <textarea
            name="openHours"
            value={formData.openHours}
            onChange={handleInputChange}
            required
            placeholder="请按以下格式填写：
周一至周五：9:00-22:00
周六至周日：8:00-23:00
节假日：8:00-23:00"
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
          <p className="mt-1 text-sm text-gray-500">
            建议使用简洁的格式，便于用户阅读
          </p>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            价格
          </label>
          <textarea
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            placeholder="请按以下格式填写：
工作日：100元/小时
周末：120元/小时
节假日：150元/小时
会员价：8折"
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
          <p className="mt-1 text-sm text-gray-500">
            建议使用简洁的格式，便于用户阅读
          </p>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            联系电话1
          </label>
          <input
            type="tel"
            name="contact.telephone"
            value={formData.contact.telephone}
            onChange={handleInputChange}
            required
            placeholder="例如：13800138000"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            联系电话2
          </label>
          <input
            type="tel"
            name="contact.telephone2"
            value={formData.contact.telephone2 || ""}
            onChange={handleInputChange}
            placeholder="选填"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            微信
          </label>
          <input
            type="text"
            name="contact.wechat"
            value={formData.contact.wechat}
            onChange={handleInputChange}
            placeholder="例如：court_manager"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            小红书
          </label>
          <input
            type="text"
            name="contact.rednote"
            value={formData.contact.rednote}
            onChange={handleInputChange}
            placeholder="例如：星光匹克球馆"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-1">
            美团
          </label>
          <input
            type="text"
            name="contact.meituan"
            value={formData.contact.meituan}
            onChange={handleInputChange}
            placeholder="例如：星光匹克球馆"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">地址信息</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              省份
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              required
              placeholder="例如：广东省"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              城市
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              placeholder="例如：深圳市"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              区县
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
              placeholder="例如：南山区"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              详细地址
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="例如：科技园路1号"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-base font-medium text-gray-900 mb-4">
          球场图片
        </label>
        <div className="grid grid-cols-2 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`预览 ${index + 1}`}
                className="h-40 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
          <label className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-center">
              <svg
                className="mx-auto h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="mt-2 block text-sm text-gray-500">添加图片</span>
            </div>
          </label>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          建议上传4-8张清晰的球场照片，包括场地、设施等
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">资质证明</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              营业执照
            </label>
            <div className="mt-2">
              {certificatePreviewUrls.businessLicense ? (
                <div className="relative group">
                  <img
                    src={certificatePreviewUrls.businessLicense}
                    alt="营业执照"
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertificate("businessLicense")}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleCertificateChange(e, "businessLicense")
                    }
                    className="hidden"
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="mt-2 block text-sm text-gray-500">
                      上传营业执照
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              负责人证明
            </label>
            <div className="mt-2">
              {certificatePreviewUrls.managerCertificate ? (
                <div className="relative group">
                  <img
                    src={certificatePreviewUrls.managerCertificate}
                    alt="负责人证明"
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertificate("managerCertificate")}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleCertificateChange(e, "managerCertificate")
                    }
                    className="hidden"
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="mt-2 block text-sm text-gray-500">
                      上传负责人证明
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-1">
              其他证明文件
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {certificatePreviewUrls.otherCertificates.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`其他证明 ${index + 1}`}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeCertificate("otherCertificates", index)
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    handleCertificateChange(e, "otherCertificates")
                  }
                  className="hidden"
                />
                <div className="text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="mt-2 block text-sm text-gray-500">
                    添加其他证明
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        {editingCourt && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-base"
          >
            取消
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-base"
        >
          {isSubmitting ? "提交中..." : editingCourt ? "更新" : "提交"}
        </button>
      </div>
    </form>
  );
}
