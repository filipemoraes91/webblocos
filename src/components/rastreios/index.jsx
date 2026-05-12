// import { getStyles } from "./style";

// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import { useThemeContext } from "../../../context/themeContext";
// import {
//   IconClock,
//   IconSubGrp,
//   IconPhone,
//   IconReturn,
//   IconSuportAgent,
// } from "../../datadisplay/icons";
// import { configGrp } from "../../../utils/sac";
// import { useEffect, useState } from "react";
// import { useGrpExpanded } from "../../hooks/useGrpExpanded";

// export function AccordionGrupo(props) {
//   const { theme, expandedSubGrp } = useThemeContext();
//   const styles = getStyles(theme);
//   const grupo = props.grupo;
//   const [expanded, setExpanded] = useState(false);
//   const [, setGruposSalvos] = useState([]);

//   function IconGrp() {
//     switch (grupo.grupo) {
//       case "Meus atendimentos":
//         return <IconPhone />;
//       case "Sendo atendidos":
//         return <IconSuportAgent />;
//       case "Retornados":
//         return <IconReturn />;
//       case "Aguardando":
//         return <IconClock />;
//       default:
//         return "";
//     }
//   }

//   useEffect(() => {
//     setGruposSalvos(JSON.parse(localStorage.getItem("configGrp")) || []);
//     setExpanded(
//       (JSON.parse(localStorage.getItem("configGrp")) || []).includes(
//         grupo.grupo
//       )
//     );
//   }, [grupo.grupo]);

//   function config() {
//     setExpanded(!expanded);
//     // setGruposSalvos(configGrp(grupo.grupo, !expanded, "configGrp"));
//   }
//   return (
//     <Accordion
//       expanded={expanded}
//       onChange={() => config()}
//       disableGutters
//       sx={styles.container}
//     >
//       <AccordionSummary
//         aria-controls="panel3-content"
//         id="panel3-header"
//         sx={styles.accordionHeader}
//       >
//         <span
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             fontSize: "16px",
//             ...styles.title,
//           }}
//         >
//           {IconGrp()}
//           <span style={styles.title}>{grupo.grupo}</span>
//         </span>
//         <span style={styles.badge}>{grupo.total}</span>
//       </AccordionSummary>
//       <AccordionDetails style={styles.accordionDetails}>
//         {expanded ? props.children : <></>}
//       </AccordionDetails>
//     </Accordion>
//   );
// }

// export function AccordionSubGrupo(props) {
//   const { theme, expandedSubGrp } = useThemeContext();
//   const styles = getStyles(theme);
//   const grupo = props.subgrupo;
//   const [, setSubGruposSalvos] = useState([]);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     setSubGruposSalvos(JSON.parse(localStorage.getItem("configSbGrp")) || []);
//     setExpanded(
//       (JSON.parse(localStorage.getItem("configSbGrp")) || []).includes(
//         grupo.nome
//       )
//     );
//   }, [grupo.nome]);

//   function config() {
//     setExpanded(!expanded);
//     setSubGruposSalvos(configGrp(grupo.nome, !expanded, "configSbGrp"));
//   }

//   return (
//     <Accordion
//       expanded={expanded}
//       onChange={() => config()}
//       disableGutters
//       sx={{ ...styles.container, background: theme.backgroundL }}
//     >
//       <AccordionSummary
//         aria-controls="panel3-content"
//         id="panel3-header"
//         sx={styles.accordionHeader}
//       >
//         <span
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             fontSize: "16px",
//             ...styles.title,
//           }}
//         >
//           <IconSubGrp />
//           <span style={styles.title}>{grupo.nome}</span>
//         </span>
//         <span style={styles.badge}>{grupo.total}</span>
//       </AccordionSummary>
//       <AccordionDetails
//         style={{ ...styles.accordionDetails, background: theme.backgroundL }}
//       >
//         {props.children && expanded ? props.children : <></>}
//       </AccordionDetails>
//     </Accordion>
//   );
// }
