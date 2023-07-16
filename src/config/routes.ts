interface RoutesConfig {
  home: string;
  ticketManagement: string;
  ticketCheck: string;
  ticketPackage: string;
}
const routesConfig: RoutesConfig = {
  home: "/",
  ticketManagement: "/ticket-management/:packacgeName",
  ticketCheck: "/ticket-check/:packacgeName",
  ticketPackage: "/ticket-package",
};

export default routesConfig;
