import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getStyles } from "./style";
import { Stack } from "@mui/material";
import { ButtonConcluir, ButtonFechar, ButtonIcon, ButtonTooltip } from "../../inputs/button";
import { TextTitlePage } from "../../datadisplay/typography";
import { useThemeContext } from "../../../context/themeContext";
import { IconClose, IconGps } from "../../datadisplay/icons";

export default function ModalDefault(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonIcon icon={props.icon} caption={props.caption} onClick={handleOpen} sx={{ background: "green" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <IconGps large /> <TextTitlePage text={props.title} />
            </Stack>
            <ButtonTooltip title="Fechar" icon={<IconClose bg={theme.colorBase.red} />} onClick={handleClose} />
          </Stack>
          <Box sx={styles.modalBody}>{props.children}</Box>
          <Stack direction="row" alignItems="center" justifyContent="end" spacing={1} pt={1}>
            <ButtonConcluir tooltip onClick={(console.log("aqui"), handleClose)} />
            <ButtonFechar onClick={handleClose} />
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
