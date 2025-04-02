import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    const connectionState = mongoose.connection.readyState;

    const states = {
      0: "未连接",
      1: "已连接",
      2: "正在连接",
      3: "正在断开连接",
      99: "未初始化",
    };

    return NextResponse.json({
      status: "success",
      message: `MongoDB 连接状态: ${states[connectionState]}`,
      connectionState,
    });
  } catch (error) {
    console.error("MongoDB 连接错误:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "数据库连接失败",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
