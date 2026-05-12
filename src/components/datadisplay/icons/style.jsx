export const getStyles = (theme, xLarge, large, bg) => ({
  icons: {
    color: bg ? bg : theme.color,
    fontSize: xLarge ? "32px" : large ? "24px" : "16px",
  },
});
