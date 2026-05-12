import { tabsClasses } from "@mui/material/Tabs";

export const getStyles = (theme) => ({
  tabs: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    [`& .${tabsClasses.indicator}`]: {
      background: theme.blue,
      height: "3px",
      borderRadius: theme.borderRadius.full,
      transition: theme.transition.base,
    },
    [`& .${tabsClasses.list}`]: {
      color: theme.color,
      padding: 0,
      margin: 0,
      // borderBottom: `1px solid ${theme.borderColor}`,
      boxShadow: "none",
    },
    [`& .${tabsClasses.scrollButtons}`]: {
      color: theme.color,
      opacity: 1,
      transition: theme.transition.base,
      "&:hover": {
        backgroundColor: theme.backgroundD,
      },
    },
    [`& .MuiTab-root`]: {
      background: theme.backgroundL,
      color: theme.color,
      minHeight: "48px",
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.semibold,
      textTransform: "none",
      transition: theme.transition.base,
      borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
      marginRight: theme.spacing.xs,
      "&:hover": {
        backgroundColor: theme.backgroundD,
        opacity: 1,
      },
      "&.Mui-selected": {
        color: theme.blue,
      },
    },
  },
});
