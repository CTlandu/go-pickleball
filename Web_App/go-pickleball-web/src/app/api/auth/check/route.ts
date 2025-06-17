import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_request: NextRequest) {
  try {
    const sessionCookie = cookies().get("session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);

    // 检查session是否过期（7天）
    if (Date.now() - session.timestamp > 7 * 24 * 60 * 60 * 1000) {
      cookies().delete("session");
      return NextResponse.json({ error: "登录已过期" }, { status: 401 });
    }

    return NextResponse.json({
      message: "已登录",
      phone: session.phone,
    });
  } catch (error) {
    console.error("检查登录状态错误:", error);
    return NextResponse.json({ error: "验证登录状态失败" }, { status: 500 });
  }
}
