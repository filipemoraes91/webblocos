export const getStyles = (theme, isMobile, visible, isHovered) => ({
  input: {
    backgroundColor: "inherit",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.lg,
    transition: "all 0.2s ease, background-color 0.3s ease",
    "& .MuiInputBase-root": {
      color: theme.color,
      borderRadius: theme.borderRadius.lg,
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.regular,
      backgroundColor: "inherit",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.borderColor,
        borderRadius: theme.borderRadius.lg,
        transition: "border-color 0.3s ease, box-shadow 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: theme.borderColor2,
        boxShadow: theme.shadow.xs,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.accent,
        borderWidth: "2px",
        boxShadow: `0 0 0 4px ${theme.accentLight}20`,
      },
    },
    "& .MuiInput-root": {
      "&:before": {
        borderBottomColor: theme.borderColor,
        transition: "border-color 0.3s ease",
      },
      "&:hover:not(.Mui-disabled, .Mui-error):before": {
        borderBottomColor: theme.borderColor2,
      },
      "&.Mui-focused:after": {
        borderBottomColor: theme.accent,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.color,
      padding: `0 ${theme.spacing.sm}`,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium,
      transition: "color 0.3s ease",
    },
    "& .Mui-focused .MuiFormLabel-root": {
      color: theme.accent,
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.backgroundD} inset !important`,
      WebkitTextFillColor: theme.color,
      transition: "background-color 5000s ease-in-out 0s",
    },
    "& input": {
      color: theme.color,
      padding: `${theme.spacing.md} ${theme.spacing.md}`,
    },
    "&.input .Mui-disabled": {
      color: "red",
    },
    "& textarea": {
      color: theme.color,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      color: "red",
    },
  },
});
