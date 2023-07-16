import { useLocation } from "react-router-dom";
import { usePathUrl } from "~/config";
import { handlerPackages } from "../helpers";
import { tickets } from "~/view/page/TicketManagement";

const usePathUrlParamsManage = () => {
  // Lấy giá trị từ query parameter (nếu có)
  const location = useLocation();
  const pathUrl = usePathUrl();
  // Trả về một object chứa các giá trị lấy được

  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("startDate") || "";
  const endDate = queryParams.get("endDate") || "";
  const status = queryParams.get("status")?.split(",") || [];
  const gates = queryParams.get("gates")?.split(",") || [];

  return {
    packageName: handlerPackages(pathUrl || "", tickets) || "Gói gia đình",
    startDate,
    endDate,
    status: status.includes("Tất cả") ? [] : status,
    gates,
  };
};

export default usePathUrlParamsManage;
