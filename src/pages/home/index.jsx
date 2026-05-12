import React from "react";
import { useThemeContext } from "../../context/themeContext";
import { getStyles } from "./style";
import { ContainerPage } from "../../components/container";
import { Paper } from "@mui/material";
import TabGeral from "../../components/navigation/tabs";

export function Home() {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);

  return (
    <ContainerPage>
      <Paper
        sx={{
          width: "100%",
          height: "85vh", // pode trocar por flex:1 se quiser ocupar tudo
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // 🔥 impede vazamento
        }}
      >
        <TabGeral
          listTabs={[
            { nome: "Coreau", codigo: 1 },
            { nome: "Russas", codigo: 2 },
            { nome: "Porangatu", codigo: 3 },
          ]}
        />
      </Paper>
    </ContainerPage>
  );
}

export default Home;