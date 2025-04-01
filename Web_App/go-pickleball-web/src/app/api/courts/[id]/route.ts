import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Court from "@/models/Court";

interface RouteParams {
  params: {
    id: string;
  };
}

// 获取单个球场信息
export async function GET(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const court = await Court.findById(params.id);
    if (!court) {
      return NextResponse.json({ error: "球场不存在" }, { status: 404 });
    }
    return NextResponse.json(court);
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "获取球场信息失败" }, { status: 500 });
  }
}

// 更新球场信息
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    await dbConnect();
    const court = await Court.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!court) {
      return NextResponse.json({ error: "球场不存在" }, { status: 404 });
    }
    return NextResponse.json(court);
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "更新球场信息失败" }, { status: 500 });
  }
}

// 删除球场信息
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const court = await Court.findByIdAndDelete(params.id);
    if (!court) {
      return NextResponse.json({ error: "球场不存在" }, { status: 404 });
    }
    return NextResponse.json({ message: "删除成功" });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "删除球场失败" }, { status: 500 });
  }
}
