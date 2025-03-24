import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Court from '@/models/Court';

// 获取所有球场
export async function GET() {
  try {
    await dbConnect();
    const courts = await Court.find({});
    return NextResponse.json(courts);
  } catch (error: any) {
    return NextResponse.json(
      { error: '获取球场列表失败', details: error.message },
      { status: 500 }
    );
  }
}

// 创建新球场
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const court = await Court.create(body);
    return NextResponse.json(court, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: '创建球场失败', details: error.message },
      { status: 500 }
    );
  }
}