import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  selectClasses,
  Skeleton,
  TextField,
} from "@mui/material";
import { useThemeContext } from "../../../context/themeContext";
import { getStyles } from "./style";
import useExtras from "../../../hooks/useExtras";
import { useEffect } from "react";
import { filtrarLista, getValorSelect, orderList } from "../../../utils/geral";
import useClientes from "../../../hooks/useClientes";
import useRastreios from "../../../hooks/useRastreios";
import { ListSubheader } from "@mui/material";
import useFAQ from "../../../hooks/useFAQ";
import { useSacContext } from "../../../context/sacContext";

function SkeletonForm() {
  return <Skeleton variant="text" sx={{ height: "70px" }} />;
}

///PADRÃO ************************************************************************************************************************************************************************************************************
export function SelectDefault(props) {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        minWidth: 120,
        p: props.p ? props.p : 1,
      }}
    >
      <FormControl fullWidth variant="standard">
        <InputLabel
          id={`InputLabel-${props.id}`}
          sx={{
            color: theme.color, // Cor padrão
            "&.Mui-focused": {
              color: theme.color, // Cor quando focado
              fontSize: "17px",
            },
            ...props.sxLabel, // permite sobrescrever externamente
          }}
        >
          {props.label}
        </InputLabel>
        <Select
          sx={{
            [`& .${selectClasses.root}`]: {
              color: theme.color,
            },
            backgroundColor: "inherit",
            color: theme.color,
            [`& .${selectClasses.icon}`]: {
              color: theme.color,
            },
            "&:before": {
              borderBottom: "1px solid white",
            },
            "&:after": {
              borderBottom: "2px solid white",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "1px solid white",
            },

            ...props.sx,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.backgroundL,
                color: theme.color,
              },
            },
          }}
          labelId={`InputLabel-${props.id}`}
          id={props.id}
          name={props.id}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          disabled={props.disabled}
          size={props.size}
          label={props.label}
          options={props.options}
        >
          {props.children}
        </Select>
      </FormControl>
    </Box>
  );
}

// PESQUISAR ************************************************************************************************************************************************************************************************************
export function SelectPesquisa(props) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
         minWidth: 120,
      }}
    >
      <SelectDefault
        id="filtro"
        name="filtro"
        color="error"
        defaultValue="Assunto"
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
        size="small"
        sxLabel={{
          margin: 0,
          padding: 0,
          "&.MuiFormLabel-root": {
            margin: 0,
            padding: 0,
          },
        }}
        p={0}
        sx={{
          "&:before": {
            borderBottom: "none",
          },
          "&:after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
          margin: "0 0 0 0px",
          padding: "0px",
          height: 0,
        }}
      >
        <MenuItem value={"Agendado"}>Agendado</MenuItem>
        <MenuItem value={"Assunto"}>Assunto</MenuItem>
        <MenuItem value={"Atendente"}>Atendente</MenuItem>
        <MenuItem value={"Cliente"}>Cliente</MenuItem>
        <MenuItem value={"Codigo"}>Codigo</MenuItem>
        <MenuItem value={"Conteudo"}>Conteudo</MenuItem>
        <MenuItem value={"Direcionado"}>Direcionado</MenuItem>
        <MenuItem value={"Referencia"}>Referência</MenuItem>
        <MenuItem value={"Software"}>Software</MenuItem>
        <MenuItem value={"Tag"}>Tag</MenuItem>
        <MenuItem value={"Versao"}>Versão</MenuItem>
      </SelectDefault>
    </span>
  );
}

// SETORES ************************************************************************************************************************************************************************************************************
export function SelectSetores(props) {
  const { tipos, loadTipos, getListTipos } = useExtras();
  const { theme } = useThemeContext();
  const styles = getStyles(theme, props.color);

  useEffect(() => {
    getListTipos();
  }, [loadTipos]);

  function ListTipos(tipo, t) {
    return (
      <MenuItem key={t} value={tipo.codigo}>
        {tipo.nome}
      </MenuItem>
    );
  }

  return (
    <SelectDefault
      id={props.id || "tipo"}
      name={props.name || "tipo"}
      label={props.labelNome ? "" : "Setores"}
      color="error"
      onChange={props.onChange}
      defaultValue={"AT"}
      value={getValorSelect(props.value, tipos, "codigo")}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      {tipos.map(ListTipos)}
    </SelectDefault>
  );
}

// ASSUNTOS ************************************************************************************************************************************************************************************************************
export function SelectAssuntos(props) {
  const { assuntos, loadAssuntos, getListAssuntos } = useExtras();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getListAssuntos();
  }, [loadAssuntos]);

  function ListAssuntos(assunto, a) {
    return (
      <MenuItem key={a} value={assunto.codigo}>
        {assunto.nome}
      </MenuItem>
    );
  }

  return (
    <SelectDefault
      id="assunto"
      name="assunto"
      label="Assunto"
      color="error"
      defaultValue={1}
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      {orderList(assuntos, "nome").map(ListAssuntos)}
    </SelectDefault>
  );
}

// PRIORIDADE ************************************************************************************************************************************************************************************************************
export function SelectPrioridade(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <SelectDefault
      id="prioridade"
      name="prioridade"
      label="Prioridade"
      color="error"
      defaultValue={1}
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      <MenuItem value={2}>BAIXO</MenuItem>
      <MenuItem value={1}>MÉDIO</MenuItem>
      <MenuItem value={0}>ALTO</MenuItem>
    </SelectDefault>
  );
}

// MOVIMENTOS ************************************************************************************************************************************************************************************************************
export function SelectMovimentos(props) {
  const { movimentos, loadMovimentos, getListMovimentos } = useExtras();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getListMovimentos(props.setor);
  }, [props.setor]);

  function ListMovimentos(movimento, m) {
    return (
      <MenuItem key={m} value={movimento.codigo}>
        {movimento.nome}
      </MenuItem>
    );
  }

  return (
    <SelectDefault
      id="movimento"
      name="movimento"
      label="Movimentos"
      defaultValue="AT"
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      {movimentos.map(ListMovimentos)}
    </SelectDefault>
  );
}

// SOFTWARE ************************************************************************************************************************************************************************************************************
export function SelectSoftware(props) {
  const { loadProgramas, getListProgramas, programas } = useExtras();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getListProgramas();
  }, [loadProgramas]);

  function ListSoftwares(software, s) {
    return (
      <MenuItem key={s} value={software.codigo}>
        {software.descricao}
      </MenuItem>
    );
  }

  return (
    <SelectDefault
      id="software"
      name="software"
      label="Software"
      defaultValue="Stackbloco"
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      {programas.map(ListSoftwares)}
    </SelectDefault>
  );
}

// USUARIOS ************************************************************************************************************************************************************************************************************
export function SelectUsuarios(props) {
  const { loadUsuarios, getListUsuarios, usuarios } = useExtras();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getListUsuarios();
  }, [loadUsuarios]);

  function ListUsuarios(usuario, s) {
    return (
      <MenuItem key={s} value={usuario.codigo}>
        {usuario.login}
      </MenuItem>
    );
  }

  return (
    <SelectDefault
      id="usuario"
      name="usuario"
      label="Usuário"
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      {orderList(usuarios, "login").map(ListUsuarios)}
    </SelectDefault>
  );
}

// CLIENTES ************************************************************************************************************************************************************************************************************
export function SelectClientes(props) {
  const { getClientes, clientes, loadingClientes } = useClientes();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getClientes();
  }, [loadingClientes]);

  if (loadingClientes) return <SkeletonForm />;

  return (
    <Autocomplete
      options={orderList(clientes, "nome")}
      getOptionLabel={(option) =>
        option.nome + `- ${option.cnpjcpf} - [${option.codigo}]`
      }
      id="pessoa"
      name="pessoa"
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      sx={styles.autocomplete}
      slotProps={styles.slot}
      renderInput={(paramns) => (
        <TextField {...paramns} label="Clientes" variant="standard" />
      )}
      isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
    />
  );
}

// GRUPOS TAREFAS ************************************************************************************************************************************************************************************************************
export function SelectGruposTarefas(props) {
  const lista = props.lista;
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <Autocomplete
      freeSolo
      options={lista}
      id="grupo"
      name="grupo"
      value={props.value}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      disabled={props.disabled}
      sx={styles.autocomplete}
      slotProps={styles.slot}
      renderInput={(paramns) => (
        <TextField {...paramns} label="Grupo" variant="standard" />
      )}
    />
  );
}

// TIPO FAQ ************************************************************************************************************************************************************************************************************
export function SelectTipoFAQ(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <SelectDefault
      id={props.id || "tipo"}
      name={props.name || "tipo"}
      label="Tipo"
      color="error"
      defaultValue={"D"}
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
      size="small"
      p={0}
      sx={styles.select}
    >
      <MenuItem value={"D"}>Documentação</MenuItem>
      <MenuItem value={"V"}>Versionamento</MenuItem>
    </SelectDefault>
  );
}

// VERSÃO FAQ PENDENTE ************************************************************************************************************************************************************************************************************
export function SelectFaqVersao(props) {
  const { getFaqPendentes, listFaqPend, loadingFaq } = useFAQ();
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  useEffect(() => {
    getFaqPendentes();
  }, []);

  function handleFAQ(faq, f) {
    return (
      <MenuItem key={f} value={faq.codigo}>
        {faq.titulo}
      </MenuItem>
    );
  }

  return loadingFaq ? (
    <SkeletonForm />
  ) : (
    <SelectDefault
      id="versao"
      name="versao"
      onChange={props.onChange}
      value={props.value}
      label="Versão FAQ"
      disabled={props.disabled}
      sx={styles.select}
    >
      {orderList(filtrarLista(listFaqPend, "tipo", "V"), "nome").map(handleFAQ)}
    </SelectDefault>
  );
}

export default function SelectRastreios({ value, onChange, disabled }) {
  // Garante que rastreios seja sempre um array
  // const rastreiosList = Array.isArray(rastreios) ? rastreios : [];
  const { loadRastreios, getRastreios, rastreios } = useRastreios();

  useEffect(() => {
    getRastreios();
  }, [loadRastreios]);

  // Função para construir árvore de rastreios recursiva
  function buildTree(items, master = null) {
    return items
      .filter((item) => {
        // Considera raiz se master for null, undefined, 0 ou não existir
        if (master === null || master === undefined || master === 0) {
          return !item.master || item.master === 0 || item.master === null;
        }
        return item.master === master;
      })
      .map((item) => ({
        ...item,
        children: buildTree(items, item.codigo),
      }));
  }

  // Função recursiva para renderizar opções
  function renderOptions(nodes, level = 0) {
    return nodes.flatMap((node) => [
      level === 0 ? (
        <ListSubheader key={`h-${node.codigo}`}>{node.descricao}</ListSubheader>
      ) : (
        <MenuItem
          key={node.codigo}
          value={node.codigo}
          sx={{ pl: 2 + level * 2 }}
        >
          {node.descricao}
        </MenuItem>
      ),
      node.children && node.children.length > 0
        ? renderOptions(node.children, level + 1)
        : null,
    ]);
  }

  const tree = buildTree(rastreios);

  return (
    <SelectDefault
      id="fontsize"
      name="fontsize"
      label="Tamanho"
      color="error"
      onChange={onChange}
      value={value}
      disabled={disabled}
      size="small"
    >
      {renderOptions(tree)}
    </SelectDefault>
  );
}
