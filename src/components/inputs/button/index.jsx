import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import {
  IconClose,
  IconMenu,
  IconShowList,
  IconPlus,
  IconExpandCollapseSubGrupo,
  IconBack,
  IconDone,
  IconTrash,
} from "../../datadisplay/icons/index.jsx";
import { useThemeContext } from "../../../context/themeContext.jsx";
import { Link } from "react-router-dom";

export const ButtonMenu = (props) => {
  const { toggleShowMenu } = useThemeContext();

  if (props.close)
    return (
      <HtmlTooltip title={"Fechar Menu"}>
        <IconButton id="menuButton" onClick={() => toggleShowMenu()}>
          <IconClose />
        </IconButton>
      </HtmlTooltip>
    );
  else
    return (
      <HtmlTooltip title={"Menu"}>
        <IconButton id="menuButton" onClick={() => toggleShowMenu()}>
          <IconMenu />
        </IconButton>
      </HtmlTooltip>
    );
};

export const ButtonShowList = () => {
  const { toggleShowList, showList, hiddenListTheme } = useThemeContext();

  return (
    <div style={{ transition: "margin-left 0.5s ease", marginLeft: "15px" }}>
      <HtmlTooltip title={showList ? "Ocultar lista" : "Mostrar Lista"}>
        <IconButton id="menuButton" onClick={() => toggleShowList()} sx={hiddenListTheme}>
          <IconShowList fontSize="26px" />
        </IconButton>
      </HtmlTooltip>
    </div>
  );
};

export const ButtonTooltip = (props) => {
  const { theme } = useThemeContext();
  return (
    <HtmlTooltip title={props.title} bg={theme.colorBase.red}>
      <IconButton
        id={props.id}
        aria-label={props.arialLabel}
        onClick={props.onClick}
        aria-controls={props.ariaControls}
        aria-haspopup={props.ariaHaspopup}
        aria-expanded={props.ariaExpanded}
        type={props.type}
        onChange={props.onChange}
        component={props.component}
        
      >
        {props.icon}
      </IconButton>
    </HtmlTooltip>
  );
};

export function HtmlTooltip(props) {
  const { theme } = useThemeContext();
  return (
    <Tooltip
      {...props}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.backgroundD,
            color: theme.color || props.color,
            maxWidth: "220px",
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            boxShadow: theme.shadow.lg,
            backdropFilter: "blur(10px)",
          },
        },
        arrow: {
          sx: {
            color: theme.backgroundD,
          },
        },
      }}
    />
  );
}

export function ButtonNovo(props) {
  return (
    <HtmlTooltip title="Novo Atendimento">
      <Link to="/sac/create" style={{ marginTop: "8px" }}>
        <IconPlus large={true} />
      </Link>
    </HtmlTooltip>
  );
}

export function ButtonVoltar(props) {
  const { theme } = useThemeContext();
  return (
    <HtmlTooltip title="Voltar">
      <Link to={props.to || "/sac"} style={{ marginTop: "8px" }}>
        <IconBack bg={theme.colorBase.orange} large />
      </Link>
    </HtmlTooltip>
  );
}

export function ButtonLink(props) {
  return (
    <HtmlTooltip title={props.title}>
      <Link to={props.to || "#"} style={{ margin: "8px 5px 0 " }}>
        {props.icon}
      </Link>
    </HtmlTooltip>
  );
}

export function ButtonConcluir(props) {
  const { theme } = useThemeContext();
  return (
    <ButtonIcon
      id="concluir"
      icon={<IconDone bg="white"  />}
      caption="Concluir"
      onClick={props.onClick}
      sx={{ background: theme.colorBase.green }}
    />
  );
}

export function ButtonCancelar(props) {
  const { theme } = useThemeContext();
  return (
    <ButtonIcon
      caption="Cancelar"
      sx={{ background: theme.colorBase.red }}
      icon={<IconClose bg="white" />}
      onClick={props.onClick}
    />
  );
}

export function ButtonExcluir(props) {
  const { theme } = useThemeContext();
  return (
    <ButtonIcon
      caption="Excluir"
      sx={{ background: theme.colorBase.red }}
      icon={<IconTrash bg="white" />}
      onClick={props.onClick}
    />
  );
}

export function ButtonFechar(props) {
  const { theme } = useThemeContext();
  return (
    <ButtonIcon
      caption="Fechar"
      sx={{ background: theme.colorBase.red }}
      icon={<IconClose bg="white"  />}
      onClick={props.onClick}
    />
  );
}

export function ButtonShowSubGrupo() {
  const { expandedSubGrp, toggleExpandedSubGrp } = useThemeContext();

  return (
    <ButtonTooltip
      title={expandedSubGrp ? "Ocultar Subgrupos" : "Mostrar Subgrupos"}
      id="buttonExpandedSubGrp"
      aria-label="buttonExpandedSubGrp"
      onClick={() => toggleExpandedSubGrp()}
      icon={<IconExpandCollapseSubGrupo large={true} open={expandedSubGrp} />}
    />
  );
}

export function ButtonCollapseExpandAll(props) {
  return (
    <ButtonTooltip
      title={props.title}
      id="buttonExpanded"
      aria-label="buttonExpanded"
      onClick={props.onClick}
      icon={<IconExpandCollapseSubGrupo large={true} open={props.open} />}
    />
  );
}

export const ButtonIcon = (props) => {
  return (
    <Button
      variant="contained"
      size="small"
      id={props.id}
      aria-label={props.arialLabel}
      onClick={props.onClick}
      aria-controls={props.ariaControls}
      aria-haspopup={props.ariaHaspopup}
      aria-expanded={props.ariaExpanded}
      type={props.type}
      onChange={props.onChange}
      component={props.component}
      startIcon={props.icon}
      sx={props.sx}
    >
      {props.caption}
    </Button>
  );
};
