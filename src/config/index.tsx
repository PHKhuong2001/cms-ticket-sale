import { useParams } from "react-router-dom";
import { DataCheck, DataManageMent } from "~/shared/interfaces";
import routesConfig from "./routes";

export const collectionNameTickets = "tickets";
export const collectionNamePackages = "tickets";
export const dataList: DataManageMent[] | DataCheck[] = [];
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
