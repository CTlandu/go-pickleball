import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 从之前的文件导入验证码存储对象
import { verificationCodes } from "../send-code/route";

export async function POST(request: NextRequest) {
  try {
    const { phone, verificationCode } = await request.json();

    // 验证手机号格式
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "请输入正确的手机号" },
        { status: 400 }
      );
    }

    // 验证验证码
    const storedCode = verificationCodes[phone];
    if (!storedCode) {
      return NextResponse.json({ error: "请先获取验证码" }, { status: 400 });
    }

    // 验证码5分钟有效期
    if (Date.now() - storedCode.timestamp > 5 * 60 * 1000) {
      delete verificationCodes[phone];
      return NextResponse.json({ error: "验证码已过期" }, { status: 400 });
    }

    if (storedCode.code !== verificationCode) {
      return NextResponse.json({ error: "验证码错误" }, { status: 400 });
    }

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

    // 删除已使用的验证码
    delete verificationCodes[phone];

    return NextResponse.json({ message: "登录成功" });
  } catch (error) {
    console.error("登录错误:", error);
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
