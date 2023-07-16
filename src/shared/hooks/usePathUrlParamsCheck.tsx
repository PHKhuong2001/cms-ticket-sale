import { useLocation } from "react-router-dom";
import { usePathUrl } from "~/config";
import { handlerPackages } from "../helpers";
import { tickets } from "~/view/page/TicketManagement";

const usePathUrlParamsCheck = () => {
  // Lấy giá trị từ query parameter (nếu có)
  const location = useLocation();
  const pathUrl = usePathUrl();
  // Trả về một object chứa các giá trị lấy được

  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("startDate") || "";
  const endDate = queryParams.get("endDate") || "";
  const statusCheck = queryParams.get("statusCheck")?.split(",") || [];
  const gates = queryParams.get("gates")?.split(",") || [];

  return {
    packageName: handlerPackages(pathUrl || "", tickets) || "Gói gia đình",
    startDate,
    endDate,
    statusCheck: statusCheck.includes("Tất cả") ? [] : statusCheck,
    gates,
  };
};

export default usePathUrlParamsCheck;
