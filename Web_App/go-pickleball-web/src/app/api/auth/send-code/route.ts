import { NextRequest, NextResponse } from "next/server";

// 生成6位随机验证码
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 存储验证码的临时对象（实际项目中应该使用Redis等缓存服务）
export const verificationCodes: {
  [key: string]: { code: string; timestamp: number };
} = {};

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    console.log("收到发送验证码请求，手机号:", phone);

    // 验证手机号格式
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      console.log("手机号格式错误:", phone);
      return NextResponse.json(
        { error: "请输入正确的手机号" },
        { status: 400 }
      );
    }

    // 生成验证码
    const code = generateVerificationCode();
    console.log("生成验证码:", code);

    // 调用短信服务发送验证码
    console.log("开始调用短信服务...");
    const response = await fetch("https://push.spug.cc/send/zk9qMjwkLZjBRgQp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "匹克乐",
        code: code,
        targets: phone,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("短信服务返回错误:", errorText);
      throw new Error("发送验证码失败");
    }

    console.log("短信发送成功");

    // 存储验证码（5分钟有效期）
    verificationCodes[phone] = {
      code,
      timestamp: Date.now(),
    };
    console.log("验证码已存储");

    return NextResponse.json({ message: "验证码已发送" });
  } catch (error) {
    console.error("发送验证码错误:", error);
    return NextResponse.json({ error: "发送验证码失败" }, { status: 500 });
  }
}
