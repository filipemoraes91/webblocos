export const getStyles = (theme) => ({
  switch: {
    margin: "0 10px",
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: theme.colorBase.stackbloco,
      "&:hover": {
        backgroundColor: "alpha(theme.colorBase.stackbloco, theme.palette.action.hoverOpacity)",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.colorBase.stackbloco,
    },
    "& .MuiFormControlLabel-label": {
      color: theme.color,
    },
  },
});
