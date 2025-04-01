import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Court from "@/models/Court";

interface Params {
  params: {
    id: string;
  };
}

// 获取单个球场信息
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const court = await Court.findById(params.id);
    if (!court) {
      return NextResponse.json({ error: "找不到该球场" }, { status: 404 });
    }

    return NextResponse.json(court);
  } catch (error) {
    console.error("获取球场信息失败:", error);
    return NextResponse.json({ error: "获取球场信息失败" }, { status: 500 });
  }
}

// 更新球场信息
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    await dbConnect();

    const updatedCourt = await Court.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourt) {
      return NextResponse.json({ error: "找不到该球场" }, { status: 404 });
    }

    return NextResponse.json(updatedCourt);
  } catch (error: any) {
    console.error("更新球场信息失败:", error);
    return NextResponse.json(
      { error: error.message || "更新球场信息失败" },
      { status: 500 }
    );
  }
}

// 删除球场信息
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const deletedCourt = await Court.findByIdAndDelete(params.id);
    if (!deletedCourt) {
      return NextResponse.json({ error: "找不到该球场" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除球场信息失败:", error);
    return NextResponse.json({ error: "删除球场信息失败" }, { status: 500 });
  }
}
