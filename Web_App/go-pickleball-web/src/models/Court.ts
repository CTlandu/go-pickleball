import mongoose, { Schema, Document, Model } from "mongoose";

// 定义球场数据接口
export interface ICourt extends Document {
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  contact: {
    telephone: string;
    wechat: string;
    rednote: string;
    meituan: string;
  };
  openHours: string;
  price: string;
  images: string[];
}

// 创建Schema
const courtSchema = new Schema<ICourt>(
  {
    name: {
      type: String,
      required: [true, "请提供球场名称"],
      trim: true,
    },
    province: {
      type: String,
      required: [true, "请提供省份"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "请提供城市"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "请提供区县"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "请提供详细地址"],
      trim: true,
    },
    contact: {
      telephone: { type: String, default: "" },
      wechat: { type: String, default: "" },
      rednote: { type: String, default: "" },
      meituan: { type: String, default: "" },
    },
    openHours: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // 自动添加createdAt和updatedAt字段
  }
);

// 防止模型被重复定义
let Court: Model<ICourt>;

try {
  // 如果模型已经存在，就使用已有的
  Court = mongoose.model<ICourt>("Court");
} catch {
  // 如果模型不存在，就创建新的
  Court = mongoose.model<ICourt>("Court", courtSchema);
}

export default Court;
