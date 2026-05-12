import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../context/themeContext";

import { getStyles } from "./style";
import { TextFieldIcon } from "../../components/inputs/textfield";
import { ContainerBase, ContainerPage } from "../../components/container";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

export function Cadastros() {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);
  const {tipo} = useParams();

  return (
    <ContainerPage>
      <h1>{tipo}</h1>
    </ContainerPage>
  );
}

export default Cadastros;
