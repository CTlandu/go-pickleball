import { NextResponse } from "next/server";
import sharp from "sharp";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "没有找到文件" }, { status: 400 });
    }

    // 验证文件类型
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "只支持 PNG, JPG, JPEG 格式的图片" },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "图片大小不能超过 2MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 使用 sharp 压缩图片
    const compressedImageBuffer = await sharp(buffer)
      .resize(1200, 1200, {
        // 最大尺寸
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 }) // 压缩质量
      .toBuffer();

    // 将图片数据转换为 Base64 字符串
    const base64Image = compressedImageBuffer.toString("base64");

    // 返回 Base64 格式的图片数据
    return NextResponse.json({
      url: `data:image/jpeg;base64,${base64Image}`,
      size: compressedImageBuffer.length,
    });
  } catch (error) {
    console.error("图片处理错误:", error);
    return NextResponse.json({ error: "图片处理失败" }, { status: 500 });
  }
}
