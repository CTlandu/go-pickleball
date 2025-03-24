'use client';
import { useState } from 'react';
import Image from 'next/image';

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
  const [formData, setFormData] = useState<CourtFormData>({
    name: '',
    province: '',
    city: '',
    district: '',
    address: '',
    contact: {
      telephone: '',
      wechat: '',
      rednote: '',
      meituan: '',
    },
    openHours: '',
    price: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previewUrls.length > 9) {
      setMessage('最多只能上传9张图片');
      return;
    }

    const newFiles = files.slice(0, 9 - previewUrls.length);
    setImageFiles(prev => [...prev, ...newFiles]);

    // 创建预览URL
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 修改提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 首先上传图片
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          return data.url;
        })
      );

      // 提交球场信息
      const courtData = {
        ...formData,
        images: imageUrls,
      };

      const res = await fetch('/api/courts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courtData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('球场信息添加成功！');
        fetchCourts();
        // 重置表单
        setFormData({
          name: '',
          province: '',
          city: '',
          district: '',
          address: '',
          contact: {
            telephone: '',
            wechat: '',
            rednote: '',
            meituan: '',
          },
          openHours: '',
          price: '',
          images: [],
        });
        setImageFiles([]);
        setPreviewUrls([]);
      } else {
        setMessage('添加失败：' + data.error);
      }
    } catch (error) {
      setMessage('提交出错：' + error.message);
    }
  };

  const [courts, setCourts] = useState([]);
  const [message, setMessage] = useState('');

  const fetchCourts = async () => {
    const res = await fetch('/api/courts');
    const data = await res.json();
    setCourts(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">球场信息管理</h1>
      
      {/* 添加球场表单 */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              球场名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              省份
            </label>
            <input
              type="text"
              value={formData.province}
              onChange={(e) => setFormData({...formData, province: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              城市
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              区县
            </label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              详细地址
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              联系电话
            </label>
            <input
              type="text"
              value={formData.contact.telephone}
              onChange={(e) => setFormData({
                ...formData,
                contact: {...formData.contact, telephone: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              微信
            </label>
            <input
              type="text"
              value={formData.contact.wechat}
              onChange={(e) => setFormData({
                ...formData,
                contact: {...formData.contact, wechat: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              小红书
            </label>
            <input
              type="text"
              value={formData.contact.rednote}
              onChange={(e) => setFormData({
                ...formData,
                contact: {...formData.contact, rednote: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              美团
            </label>
            <input
              type="text"
              value={formData.contact.meituan}
              onChange={(e) => setFormData({
                ...formData,
                contact: {...formData.contact, meituan: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              价格信息
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
              placeholder="例如：平日100元/小时，周末120元/小时"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              场地图片（最多9张）
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full"
              disabled={previewUrls.length >= 9}
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`预览图 ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          添加球场
        </button>
      </form>

      {message && (
        <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700">
          {message}
        </div>
      )}

      {/* 球场列表 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">已添加的球场</h2>
        <div className="grid grid-cols-1 gap-4">
          {courts.map((court: any) => (
            <div key={court._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">{court.name}</h3>
              <p className="text-gray-600">
                {court.province} {court.city} {court.district}
              </p>
              <p className="text-gray-600">{court.address}</p>
              <p className="text-gray-600">营业时间：{court.openHours}</p>
              <p className="text-green-600 font-bold">￥{court.price}/小时</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}