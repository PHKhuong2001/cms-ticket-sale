import { useParams } from "react-router-dom";
import { DataCheck, DataManageMent, DataPackage } from "~/shared/interfaces";
import routesConfig from "./routes";

export const collectionNameTickets = "tickets";
export const collectionNamePackages = "packages";
export const dataList: DataManageMent[] | DataCheck[] = [];
export const dataPackageList: DataPackage[] = [];
export const getByNumberTicket: DataManageMent = {
  key: `${0}`,
  stt: 0,
  bookingCode: "",
  soVe: "",
  tenSuKien: "",
  trangThai: "",
  ngaySuDung: "",
  ngayXuatVe: "",
  congCheckIn: "",
  actions: {
    text: "",
    ticketNumber: "",
  },
};

export const getDataPackage: DataPackage = {
  key: "",
  stt: 0,
  maGoi: "",
  tenGoiVe: "",
  ngayApDung: "",
  ngayHetHan: "",
  giaVe: "",
  combo: "",
  tinhTrang: "",
  actions: "",
};

export const filtersDataCheckObject = {
  packageName: "",
  startDate: "",
  endDate: "",
  statusCheck: [],
  gates: [],
};
export const usePathUrl = () => {
  const { packacgeName } = useParams();
  return packacgeName;
};

export const handlerChangePackage = (path: string) => {
  if (path === routesConfig.ticketCheck) {
    return "/ticket-check/family";
  } else if (path === routesConfig.ticketManagement) {
    return "/ticket-management/family";
  } else if (path === routesConfig.home) {
    return routesConfig.home;
  } else {
    return routesConfig.ticketPackage;
  }
};
export const handlerRemovePath = (path: string) => {
  if (path === routesConfig.home) {
    return path;
  } else {
    const pathSegments = path.split("/");
    const extractedPath = `/${pathSegments[1]}`;
    return extractedPath;
  }
};

export const takeTimeAndDate = (dateAndTime: string) => {
  const cutting = dateAndTime.split(" ");
  return {
    date: cutting,
    time: "",
  };
};
