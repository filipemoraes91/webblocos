import { TextField } from "@mui/material";
import { useThemeContext } from "../../../context/themeContext";
import { getStyles } from "./style";
import { formatInputDateTime } from "../../../utils/date";

export function TextFieldIcon(props) {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);
  return (
    <TextField
      label={props.label}
      id={props.id}
      name={props.name}
      value={props.value}
      variant="standard"
      type={props.type}
      autoFocus={props.autoFocus}
      autoComplete="off"
      disabled={props.disabled}
      fullWidth
      onChange={props.onChange}
      sx={styles.input}
      multiline={props.multiline}
      rows={props.rows || 1}
      color="error"
      slotProps={{
        input: {
          startAdornment: props.icon,
        },
      }}
    />
  );
}

export function TextFieldPesquisa(props) {
  const { theme } = useThemeContext();
  return (
    <TextField
      label={props.label}
      name={props.name}
      size="small"
      variant="standard"
      type={props.type}
      placeholder="pesquisar..."
      autoFocus={props.autoFocus}
      autoComplete="off"
      fullWidth
      onChange={props.onChange}
      InputProps={{
        sx: {
          width: "340px",
          marginTop: "16px",
          color: theme.color,
          "&:before": {
            borderBottom: "1px solid white",
          },
          "&:after": {
            borderBottom: "2px solid white",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid white",
          },
        },
      }}
      sx={{
        background: theme.background2,
        input: {
          color: theme.color,
          "::placeholder": {
            color: theme.color,
            opacity: 0.6,
          },
        },
      }}
    />
  );
}

export function TextFieldDate(props) {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);
  return (
    <TextField
      label={props.label}
      name={props.name}
      variant="standard"
      type="datetime-local"
      defaultValue={formatInputDateTime(Date.now())}
      autoFocus={props.autoFocus}
      autoComplete="off"
      fullWidth
      onChange={props.onChange}
      color="error"
      sx={{
        margin: "10px 0",
        ...styles.input,
        // background: theme.background2,
      }}
    />
  );
}
