interface RoutesConfig {
  home: string;
  ticketManagement: string;
  ticketCheck: string;
  ticketPackage: string;
}
const routesConfig: RoutesConfig = {
  home: "/",
  ticketManagement: "/ticket-management",
  ticketCheck: "/ticket-check",
  ticketPackage: "/ticket-package",
};

export default routesConfig;
