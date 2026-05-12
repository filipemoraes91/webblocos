export const getStyles = (theme, isMobile, visible, isHovered) => ({
  empresas: {
    // width: isMobile ? "100vw" : "20%",
    // height: isMobile ? "100%" : "75%",
    // position: "absolute",
    top: isMobile ? "0" : "10%",
    left: isMobile ? "0" : "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.backgroundD}`,
    padding: isMobile ? "10px" : "20px",
    boxShadow: isMobile ? "0" : "10px 10px 20px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    borderRadius: "7px",
  },
});
