import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Court from "@/models/Court";

// 获取所有球场信息
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const courts = await Court.find({});
    return NextResponse.json(courts);
  } catch (error) {
    console.error("获取球场列表失败:", error);
    return NextResponse.json({ error: "获取球场列表失败" }, { status: 500 });
  }
}

// 创建新球场
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    const court = await Court.create(body);
    return NextResponse.json(court, { status: 201 });
  } catch (error: any) {
    console.error("创建球场失败:", error);
    return NextResponse.json(
      { error: error.message || "创建球场失败" },
      { status: 500 }
    );
  }
}
