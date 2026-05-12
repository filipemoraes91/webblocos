export const getStyles = (theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 440,
    boxShadow: 24,
    p: 1,
    backgroundColor: `${theme.backgroundL}`,
    // border: `1px solid ${theme.backgroundD}`,
    borderRadius: "7px",
    maxHeight: "90%",
  },
  modalBody: {
    background: theme.backgroundD,
    padding: "5px",
    maxHeight: "350px",
    overflow: "overlay",
  },
  modalAction: {
    background: theme.backgroundD,
    padding: "5px 0",
    width: "100%",
    textAlign: "end",
  },
});
