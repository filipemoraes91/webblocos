import { getStyles } from "./style";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useThemeContext } from "../../../context/themeContext";
import {
  IconClock,
  IconPhone,
  IconReturn,
  IconSuportAgent,
  IconMarc,
  IconList,
  IconSector,
  IconArrowRightOut,
} from "../../datadisplay/icons";
import { useEffect, useState } from "react";
import { useAccordionGruposConfig } from "../../../hooks/useAccordionGruposConfig";
import { Stack } from "@mui/material";

let color = "";

export function AccordionGrupo(props) {
  const { theme } = useThemeContext();
  const grupo = props.grupo;
  const styles = getStyles(theme, grupo.grupo);
  const { config, updateConfig, loading } = useAccordionGruposConfig();
  const [expanded, setExpanded] = useState(false);

  function IconGrp() {
    switch (grupo.grupo) {
      case "Meus atendimentos":
        return <IconPhone />;
      case "Sendo atendidos":
        return <IconSuportAgent />;
      case "Retornados":
        return <IconReturn />;
      case "Aguardando":
        return <IconClock />;
      default:
        return "";
    }
  }

  useEffect(() => {
    if (config && config.grupos) {
      setExpanded(!!config.grupos[grupo.grupo]);
    }
  }, [config, grupo.grupo]);

  async function handleAccordionChange() {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    await updateConfig(grupo.grupo, newExpanded);
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      disableGutters
      style={styles.accordion}
    >
      <AccordionSummary
        aria-controls="panel3-content"
        id="panel3-header"
        sx={styles.accordionHeader}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            ...styles.title,
          }}
        >
          {/* {IconGrp()} */}
          <span style={styles.title}>
            <Stack direction="row" spacing={1}>
              <span>{IconGrp()}</span>
              <span>{grupo.grupo}</span>
            </Stack>
          </span>
        </span>
        <span style={styles.badge}>{grupo.total || props.total}</span>
      </AccordionSummary>
      <AccordionDetails style={styles.accordionDetails}>
        {expanded ? props.children : <></>}
      </AccordionDetails>
    </Accordion>
  );
}

export function AccordionSubGrupo(props) {
  const { theme, expandedSubGrp } = useThemeContext();
  const styles = getStyles(theme);
  const grupo = props.subgrupo;
  const [, setSubGruposSalvos] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setSubGruposSalvos(JSON.parse(localStorage.getItem("configSbGrp")) || []);
    setExpanded(
      (JSON.parse(localStorage.getItem("configSbGrp")) || []).includes(
        grupo.nome,
      ),
    );
  }, [grupo.nome]);

  useEffect(() => {
    setExpanded(
      (JSON.parse(localStorage.getItem("configSbGrp")) || []).includes(
        grupo.nome,
      ) || expandedSubGrp,
    );
  }, [expandedSubGrp]);

  function config() {
    setExpanded(!expanded);
    setSubGruposSalvos(configGrp(grupo.nome, !expanded, "configSbGrp"));
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={() => config()}
      disableGutters
      sx={styles.container}
    >
      <AccordionSummary
        aria-controls="panel3-content"
        id="panel3-header"
        sx={styles.accordionHeader}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            ...styles.title,
          }}
        >
          <span style={styles.title}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconMarc />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: color /* cor sólida */,
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              {grupo.nome}
            </Stack>
          </span>
        </span>
        <span style={styles.badge}>{grupo.total}</span>
      </AccordionSummary>
      <AccordionDetails style={styles.accordionDetails}>
        {props.children && expanded ? props.children : <></>}
      </AccordionDetails>
    </Accordion>
  );
}

export function AccordionColunasKanban(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  const coluna = props.coluna;
  const [isOver, setIsOver] = useState(false);

  return (
    <Accordion
      expanded={true}
      disableGutters
      sx={{
        ...styles.container,
        width: "250px",
        minWidth: 300,
        flexShrink: 0,
        padding: isOver ? `${theme.spacing.sm}` : `${theme.spacing.sm}`,
        border: isOver
          ? `2px groove ${theme.colorBase.stackbloco}`
          : "2px groove transparent",
        transition: "all 0.2s ease",
        borderRadius: "8px",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
        props.onDragOver && props.onDragOver(e);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOver(false);
        }
      }}
      onDrop={(e) => {
        setIsOver(false);
        props.onDrop && props.onDrop(e);
      }}
    >
      <AccordionSummary
        aria-controls="panel3-content"
        id="panel3-header"
        sx={styles.accordionHeader}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            ...styles.title,
          }}
        >
          <span style={styles.title}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconList large />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: color /* cor sólida */,
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              {coluna.nome}
            </Stack>
          </span>
        </span>
        <span style={styles.badge}>{coluna?.total || 0}</span>
      </AccordionSummary>
      <AccordionDetails style={styles.accordionDetails}>
        <div id="columnChild" style={styles.detailsKanban}>
          <div>{props.children}</div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export function AccordionMovimentos(props) {
  const { theme } = useThemeContext();
  const grupo = props.grupo;
  const styles = getStyles(theme, grupo.grupo);
  const { config, updateConfig, loading } = useAccordionGruposConfig();
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}    
      disableGutters
      style={styles.accordion}
    >
      <AccordionSummary
        aria-controls="panel3-content"
        id="panel3-header"
        sx={styles.accordionHeader}
        onClick={props.onClick}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            ...styles.title,
          }}
        >
          <span style={styles.title}>
            <Stack direction="row" spacing={1}>
              <span>{<IconList />}</span>
              <span>{grupo.nome}</span>
            </Stack>
          </span>
        </span>
        <span style={styles.badge}>{grupo.total || props.total}</span>
      </AccordionSummary>
      <AccordionDetails style={styles.accordionDetails}>
        {expanded ? props.children : <></>}
      </AccordionDetails>
    </Accordion>
  );
}
