export const getStyles = (theme, color) => ({
  select: {
    "&:before": {
      borderBottom: color
        ? `2px solid ${theme.accent}`
        : `1px solid ${theme.borderColor}`,
      transition: "border-color 0.3s ease",
    },
    "&:after": {
      borderBottom: `2px solid ${theme.accent}`,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.borderColor2}`,
    },
    "& .MuiInputLabel-root": {
      color: theme.color,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium,
      transition: "color 0.3s ease",
    },
    margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
    padding: `${theme.spacing.md} 0`,
    height: 0,
  },
  autocomplete: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    "& .MuiIconButton-root": {
      color: theme.color,
      transition: "color 0.3s ease",
    },
    "& .MuiInputLabel-root": {
      color: theme.color,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium,
      transition: "color 0.3s ease",
    },
    "& .MuiInputBase-input": {
      color: theme.color,
      padding: `${theme.spacing.md} 0`,
      fontSize: theme.fontSize.base,
      transition: "color 0.3s ease",
    },
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid ${theme.borderColor}`,
      transition: "border-color 0.3s ease",
    },
    "& .MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.colorBase.stackbloco}`,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.borderColor2}`,
    },
    "&:before": {
      borderBottom: `2px solid ${theme.borderColor}`,
      transition: "border-color 0.3s ease",
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colorBase.stackbloco}`,
    },
  },
  slot: {
    paper: {
      sx: {
        backgroundColor: theme.backgroundL,
        color: theme.color,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadow.lg,
        border: `1px solid ${theme.borderColor}`,
        transition:
          "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
      },
    },
    popper: {
      sx: {
        zIndex: theme.zIndex.dropdown,
      },
    },
  },
});
