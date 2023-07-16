export interface DataManageMent {
  key: string;
  stt: number;
  bookingCode: string;
  soVe: string;
  tenSuKien?: string;
  trangThai: any;
  ngaySuDung: string;
  ngayXuatVe: string;
  congCheckIn: string;
  actions: any;
}

export interface DataCheck {
  key: string;
  stt: number;
  soVe: string;
  tenSuKien?: string;
  ngaySuDung: string;
  loaiVe: string;
  congCheckIn: string;
  doiSoat: string;
}

export interface FiltersDataCheckType {
  packageName: string;
  startDate?: string;
  endDate?: string;
  statusCheck?: string[];
  gates?: string[];
}
