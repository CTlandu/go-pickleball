import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Court from "@/models/Court";
import { Error as MongooseError } from "mongoose";

// 获取所有球场信息
export async function GET() {
  try {
    console.log("正在连接数据库...");
    await dbConnect();
    console.log("数据库连接成功，正在获取球场数据...");

    // 简单查询，不使用排序
    let courts = await Court.find({}).lean();

    console.log(`成功获取到 ${courts.length} 个球场数据`);
    if (courts.length > 0) {
      // 创建一个用于日志输出的对象，隐藏图片数据
      const logCourt = {
        ...courts[0],
        images: courts[0].images?.map(() => "[图片数据已隐藏]"),
      };
      console.log("球场数据示例:", logCourt);
    }

    // 如果没有数据，添加测试数据
    if (courts.length === 0) {
      console.log("数据库为空，正在添加测试数据...");
      try {
        const newCourt = await Court.create({
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        courts = [(await Court.findById(newCourt._id).lean())!];
        console.log("测试数据添加成功");
      } catch (error) {
        console.error("添加测试数据失败:", error);
      }
    }

    return NextResponse.json(courts);
  } catch (error: unknown) {
    console.error("获取球场数据时出错:", error);

    if (error instanceof MongooseError) {
      return NextResponse.json(
        { error: `数据库错误: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "获取球场信息失败，请检查数据库连接" },
      { status: 500 }
    );
  }
}

// 创建新球场
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("正在连接数据库...");
    await dbConnect();
    console.log("数据库连接成功，正在创建新球场...");

    const court = await Court.create(body);
    console.log("新球场创建成功:", court._id);

    return NextResponse.json(court, { status: 201 });
  } catch (error: unknown) {
    console.error("创建球场时出错:", error);

    if (error instanceof MongooseError) {
      return NextResponse.json(
        { error: `数据库错误: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "创建球场失败，请检查输入数据" },
      { status: 500 }
    );
  }
}
