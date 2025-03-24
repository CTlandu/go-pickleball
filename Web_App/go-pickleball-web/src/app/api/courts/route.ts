import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Court from '@/models/Court';

export async function GET() {
  try {
    await dbConnect();
    const courts = await Court.find({});
    return NextResponse.json(courts);
  } catch (error) {
    return NextResponse.json({ error: '获取球场信息失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const court = await Court.create(data);
    return NextResponse.json(court);
  } catch (error) {
    return NextResponse.json({ error: '创建球场信息失败' }, { status: 500 });
  }
}