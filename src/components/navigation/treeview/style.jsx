export const getStyles = (theme) => ({
  itens: {
    "& .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-selected .MuiTreeItem-label":
      {
        background: theme.colorBase.red,
        color: "#FFFFFF",
      },
    "& .MuiTreeItem-iconContainer": { color: theme.color },
    "& .MuiTreeItem-content:not(.Mui-selected), & .MuiTreeItem-content:not(.Mui-selected) .MuiTreeItem-label":
      {
        color: theme.color,
        background: "inherit",
      },
    ".css-do267h-MuiTreeItem-content[data-selected]:hover": {
      background: theme.colorBase.red,
    },
  },
});
