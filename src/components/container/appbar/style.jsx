export const getStyles = (theme) => ({
  nav: {
    height: "auto",
    background: `linear-gradient(195deg, ${theme.backgroundL}, ${theme.backgroundD}05)`,
    borderBottom: 'none',
    boxShadow: theme.shadow.sm,
    backdropFilter: "blur(20px)",
    transition: "all 0.2s ease, background 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },
  navToolbar: {
    height: "72px",
    padding: `${theme.spacing.md} ${theme.spacing.xxl}`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    minHeight: "72px",
  },
  auxbarIntegrated: {
    height: "68px",
    padding: `0 ${theme.spacing.xxl}`,
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${theme.borderColor}30`,
    transition: "border-color 0.3s ease",
  },
});
