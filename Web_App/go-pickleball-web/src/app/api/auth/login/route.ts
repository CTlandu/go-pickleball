import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const { phone, verificationCode } = await request.json();
    console.log("收到登录请求，手机号:", phone, "验证码:", verificationCode);

    // 验证手机号格式
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      console.log("手机号格式错误:", phone);
      return NextResponse.json(
        { error: "请输入正确的手机号" },
        { status: 400 }
      );
    }

    // 从Redis获取验证码
    const storedCode = await redis.get(`verification:${phone}`);
    if (!storedCode) {
      console.log("未找到存储的验证码");
      return NextResponse.json({ error: "请先获取验证码" }, { status: 400 });
    }

    if (storedCode !== verificationCode) {
      console.log("验证码不匹配，输入:", verificationCode, "存储:", storedCode);
      return NextResponse.json({ error: "验证码错误" }, { status: 400 });
    }

    console.log("验证码验证通过");

    // 验证通过，生成session
    const session = {
      phone,
      timestamp: Date.now(),
    };

    // 设置cookie（实际项目中应该使用更安全的session管理方式）
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7天
    });
    console.log("Session已设置");

    // 删除已使用的验证码
    await redis.del(`verification:${phone}`);
    console.log("验证码已删除");

    return NextResponse.json({ message: "登录成功" });
  } catch (error) {
    console.error("登录错误:", error);
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
