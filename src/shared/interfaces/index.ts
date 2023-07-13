export interface DataManageMent {
  key: string;
  stt: number;
  bookingCode: string;
  soVe: string;
  tenSuKien?: string;
  trangThai: string;
  ngaySuDung: any;
  ngayXuatVe: any;
  congCheckIn: string;
  actions: string;
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
