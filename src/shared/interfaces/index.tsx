export interface DataManageMent {
  key: string;
  stt: number;
  bookingCode: string;
  soVe: string;
  tenSuKien?: string;
  trangThai: any;
  ngaySuDung: string;
  ngayXuatVe?: string;
  hanSudung?: string;
  congCheckIn: string;
  actions: {
    text: string;
    ticketNumber: string;
  };
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

export interface DataPackage {
  key: string;
  stt: number;
  maGoi: string;
  tenGoiVe: string;
  ngayApDung: string;
  ngayHetHan: string;
  giaVe: string;
  combo: string;
  tinhTrang: string;
  actions: string;
}
