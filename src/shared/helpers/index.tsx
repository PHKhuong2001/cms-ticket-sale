import moment from "moment";
import { Packages } from "~/view/page/TicketManagement";

export const handlerPackages = (name: string, packages: Packages[]) => {
  const findPackage = packages.find((item) => item.filterTicket === name);
  return findPackage?.name || "";
};

export const changeTime = (time: any) => {
  return moment.unix(time).format("DD/MM/YYYY");
};
