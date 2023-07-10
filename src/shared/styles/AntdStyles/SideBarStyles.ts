const rootStlye = {
  linkTextButton: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "26px",
    marginBottom: "0",
    color: "#FFFFFF",
  },
  linkButton: {
    display: "flex",
    width: "100%",
    marginBottom: "10px",
    alignItems: "center",
    height: "50px",
    background: "#FFB800",
    borderRadius: "8px",
    padding: "15px 16px 15px 24px",
    gap: "12px",
  },
};
const SideBarCssStyle = {
  linkButton: {
    ...rootStlye.linkButton,
    background: "transparent",
    color: "",
  },
  linkButtonClick: {
    ...rootStlye.linkButton,
  },
  linkTextButton: {
    ...rootStlye.linkTextButton,
    color: "#1E0D03",
    opacity: "60%",
  },
  linkTextButtonClick: {
    ...rootStlye.linkTextButton,
    fontWeight: "600",
  },
  linkSettingButton: {
    height: "35px",
    padding: "0px 16px 15px 65px",
    color: "#1E0D03",
    fontSize: "16px",
  },
  linkSettingButtonClick: {
    height: "35px",
    padding: "0px 16px 15px 65px",
    color: "#1E0D03",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default SideBarCssStyle;
