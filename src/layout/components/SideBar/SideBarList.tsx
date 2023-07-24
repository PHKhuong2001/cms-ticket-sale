import {
  HomeIcon,
  TicketManagementIcon,
  TicketCheckIcon,
  TicketSettingIcon,
} from "~/shared/components/Icons";
import routesConfig from "~/config/routes";
import { SideBarList } from "./index";
import { SettingOutlined } from "@ant-design/icons";
const listSideBar: SideBarList[] = [
  {
    icon: <HomeIcon width="24" height="24" />,
    iconClick: (
      <HomeIcon width="24" height="24" fillColor="white" opacityColor="1" />
    ),
    name: "Trang chủ",
    path: routesConfig.home,
  },
  {
    icon: <TicketManagementIcon width="24" height="24" />,
    iconClick: (
      <TicketManagementIcon
        width="24"
        height="24"
        fillColor="white"
        opacityColor="1"
      />
    ),
    name: "Quản lý vé",
    path: routesConfig.ticketManagement,
    filterPath: true,
  },
  {
    icon: <TicketCheckIcon width="24" height="24" />,
    iconClick: (
      <TicketCheckIcon
        width="24"
        height="24"
        fillColor="white"
        opacityColor="1"
      />
    ),
    name: "Đối soát vé",
    path: routesConfig.ticketCheck,
  },
  {
    icon: <TicketSettingIcon width="24" height="24" />,
    iconClick: (
      <TicketSettingIcon
        width="24"
        height="24"
        fillColor="white"
        opacityColor="1"
      />
    ),
    name: "Cài Đặt",
    path: "#",
    setting: [{ name: "Gói dịch vụ", path: routesConfig.ticketPackage }],
  },
];

export default listSideBar;
