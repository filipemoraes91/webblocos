import Switch from "@mui/material/Switch";
import { useThemeContext } from "../../../context/themeContext";
import { getStyles } from "./style";
import { FormControlLabel } from "@mui/material";

export default function SwitchDefault(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <FormControlLabel
      sx={styles.switch}
      control={
        <Switch
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
          size="small"
        />
      }
      label={props.label}
    />
  );
}
