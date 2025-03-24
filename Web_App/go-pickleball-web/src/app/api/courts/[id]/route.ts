import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Court from "@/models/Court";

// 获取单个球场信息
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const court = await Court.findById(params.id);

    if (!court) {
      return NextResponse.json({ error: "未找到该球场" }, { status: 404 });
    }

    return NextResponse.json(court);
  } catch (error) {
    return NextResponse.json({ error: "获取球场信息失败" }, { status: 500 });
  }
}

// 更新球场信息
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await dbConnect();

    const updatedCourt = await Court.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourt) {
      return NextResponse.json({ error: "未找到该球场" }, { status: 404 });
    }

    return NextResponse.json(updatedCourt);
  } catch (error: any) {
    return NextResponse.json(
      { error: "更新球场信息失败", details: error.message },
      { status: 500 }
    );
  }
}

// 删除球场信息
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedCourt = await Court.findByIdAndDelete(params.id);

    if (!deletedCourt) {
      return NextResponse.json({ error: "未找到该球场" }, { status: 404 });
    }

    return NextResponse.json({ message: "球场删除成功" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "删除球场失败", details: error.message },
      { status: 500 }
    );
  }
}
