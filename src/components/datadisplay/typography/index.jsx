import { Typography } from "@mui/material";
import { useThemeContext } from "../../../context/themeContext";
import { getStyles } from "./style";

export function TypographyTitle(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  return (
    <Typography variant="button" gutterBottom sx={{ display: "block", color: styles.title }}>
      {props.text}
    </Typography>
  );
}

export function TypographySubTitle(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  return (
    <Typography variant="button" gutterBottom sx={{ display: "block", color: styles.subTitle }}>
      {props.text}
    </Typography>
  );
}

export function TypographyFAQ(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  return (
    <Typography gutterBottom sx={styles.textFaq}>
      {props.text}
    </Typography>
  );
}

export function TextTitlePage(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <span style={{ margin: "15px 5px 5px" }}>{props.icon}</span>
      <span style={styles.titlePage}>{props.text}</span>
    </span>
  );
}
