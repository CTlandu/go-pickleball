export interface Court {
  _id: string;
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  openHours: string;
  price: string;
  contact: {
    telephone: string;
    telephone2?: string;
    wechat: string;
    rednote: string;
    meituan: string;
  };
  images: string[];
  managerPhone: string;
  managerName: string;
  certificates: {
    businessLicense?: string;
    managerCertificate?: string;
    otherCertificates?: string[];
  };
}

export interface CourtFormData {
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  openHours: string;
  price: string;
  contact: {
    telephone: string;
    telephone2?: string;
    wechat: string;
    rednote: string;
    meituan: string;
  };
  images: string[];
  managerName: string;
  certificates: {
    businessLicense?: string;
    managerCertificate?: string;
    otherCertificates?: string[];
  };
}
