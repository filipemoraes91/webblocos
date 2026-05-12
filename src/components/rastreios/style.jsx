export const getStyles = (theme) => ({
  container: {
    marginBottom: "5px",
    borderRadius: "1px",
    backgroundColor: `${theme.backgroundL}`,
    padding: 0,
    color: theme.color,
    border: `1px solid ${theme.backgroundD}`,
  },
  accordionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    color: `${theme.color}`,
    padding: "0 5px",
  },
  title: {
    fontSize: "0.875rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  accordionDetails: {
    overflow: "hidden",
    transition: "max-height 0.3s ease",
    background: `${theme.backgroundL}`,
    padding: "0 5px",
    marginBottom: "5px",
  },
});
