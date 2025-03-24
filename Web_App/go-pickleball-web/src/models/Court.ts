import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "请输入球场名称"],
      maxlength: [60, "球场名称不能超过60个字符"],
    },
    province: {
      type: String,
      required: [true, "请输入所在省份"],
    },
    city: {
      type: String,
      required: [true, "请输入所在城市"],
    },
    district: {
      type: String,
      required: [true, "请输入所在区县"],
    },
    address: {
      type: String,
      required: [true, "请输入球场地址"],
    },
    contact: {
      telephone: {
        type: String,
      },
      wechat: {
        type: String,
      },
      rednote: {
        type: String,
      }
    },
    openHours: {
      type: String,
      required: [true, "请输入营业时间"],
    },
    price: {
      type: Number,
      required: [true, "请输入订场价格"],
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Court || mongoose.model("Court", CourtSchema);
