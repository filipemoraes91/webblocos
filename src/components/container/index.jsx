import { Box, Paper, Stack } from "@mui/material";
import { getStyles } from "./style";
import { useThemeContext } from "../../context/themeContext";
import AppBarSac from "./appbar";
import { useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "../datadisplay/icons";

import { useSacContext } from "../../context/sacContext";

export function ContainerPage(props) {
  const { theme, showList, toggleShowList, isMobile } = useThemeContext();
  const [isHovered, setIsHovered] = useState(false);
  const styles = getStyles(theme, showList, isMobile, isHovered);
  const containerRef = useRef(null);

  function handleAutoScroll(e) {
    const container = containerRef.current;
    if (!container) return;

    const { clientX } = e;
    const rect = container.getBoundingClientRect();

    const threshold = 150; // zona sensível maior = mais confortável
    const maxSpeed = 500;

    if (clientX < rect.left + threshold) {
      const intensity = (rect.left + threshold - clientX) / threshold;
      container.scrollLeft -= maxSpeed * intensity;
    } else if (clientX > rect.right - threshold) {
      const intensity = (clientX - (rect.right - threshold)) / threshold;
      container.scrollLeft += maxSpeed * intensity;
    }
  }

  return (
    <ContainerBase>
      <Paper elevation={3}>
        <div id="navbar" style={styles.nav}>
          <AppBarSac
            showSearch={props.showSearch}
            auxLeft={props.auxLeft}
            auxRight={props.auxRight}
          />
        </div>
      </Paper>
      <Box id="content" style={styles.listdetail}>
        {props.children}
      </Box>
      <Paper id="footer" style={styles.footer} elevation={0}></Paper>
    </ContainerBase>
  );
}

export function ContainerBase(props) {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);

  return <div style={styles.container}>{props.children}</div>;
}
