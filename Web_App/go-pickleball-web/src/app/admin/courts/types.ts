export interface Court {
  _id: string;
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

export interface CourtFormData {
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

// 创建一个用于API响应的类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
