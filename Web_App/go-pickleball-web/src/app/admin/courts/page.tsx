"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CourtForm from "./components/CourtForm";
import CourtList from "./components/CourtList";
import { Court, CourtFormData } from "./types";

export default function AdminCourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [editingCourt, setEditingCourt] = useState<Court | undefined>();
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courts");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setCourts(data);
    } catch (error: unknown) {
      console.error("获取球场数据失败:", error);
      if (error instanceof Error) {
        setMessage("获取球场信息失败：" + error.message);
      } else {
        setMessage("获取球场信息失败");
      }
    } finally {
      setLoading(false);
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
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage(editingCourt ? "球场信息更新成功！" : "球场信息添加成功！");
        fetchCourts();
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定要删除这个球场吗？")) return;

    try {
      const res = await fetch(`/api/courts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("球场删除成功");
        fetchCourts();
      } else {
        const data = await res.json();
        setMessage("删除失败：" + data.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("删除出错：" + error.message);
      } else {
        setMessage("删除出错");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCourt(undefined);
  };

  const handleEditCourt = (court: Court) => {
    console.log("编辑球场:", court);
    if (court && court._id) {
      setEditingCourt(court);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("无效的球场数据:", court);
      setMessage("编辑失败：无效的球场数据");
    }
  };

  const handleImageClick = (imageUrl: string) => {
    if (imageUrl && imageUrl.trim() !== "") {
      setSelectedImage(imageUrl);
    } else {
      console.warn("尝试查看无效的图片URL");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {editingCourt ? "编辑球场信息" : "添加新球场"}
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <CourtForm
            editingCourt={editingCourt}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />

          {courts.length > 0 ? (
            <CourtList
              courts={courts}
              onEdit={handleEditCourt}
              onDelete={handleDelete}
              onImageClick={handleImageClick}
            />
          ) : (
            <div className="mt-8 text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">暂无球场信息</p>
            </div>
          )}
        </>
      )}

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
  );
}
