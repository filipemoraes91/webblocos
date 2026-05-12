import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ModalEditarBloco({ open, onClose, bloco, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (bloco) {
      setForm({
        ...bloco,
        medidas_brutas: { ...bloco.medidas_brutas },
        medidas_liquidas: { ...bloco.medidas_liquidas },
      });
    }
  }, [bloco]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedidaChange = (tipo, campo, value) => {
    setForm((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: value,
      },
    }));
  };

  const handleCheck = (field, checked) => {
    setForm((prev) => ({
      ...prev,
      [field]: checked ? "OK" : null,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  if (!form) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Editar Bloco #{form.numero}</DialogTitle>

      <DialogContent dividers>
        {/* 🔹 MEDIDAS BRUTAS */}
        <Typography variant="h6">Medidas Brutas</Typography>
        <Grid container spacing={2} mt={1}>
          {["altura", "largura", "comprimento", "m3"].map((campo) => (
            <Grid item xs={3} key={campo}>
              <TextField
                size="small"
                label={campo.toUpperCase()}
                type="number"
                fullWidth
                value={form.medidas_brutas[campo] ?? ""}
                onChange={(e) =>
                  handleMedidaChange(
                    "medidas_brutas",
                    campo,
                    Number(e.target.value),
                  )
                }
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 MEDIDAS LÍQUIDAS */}
        <Typography variant="h6">Medidas Líquidas</Typography>
        <Grid container spacing={2} mt={1}>
          {["altura", "largura", "comprimento", "m3"].map((campo) => (
            <Grid item xs={3} key={campo}>
              <TextField
                label={campo.toUpperCase()}
                size="small"
                type="number"
                fullWidth
                value={form.medidas_liquidas[campo] ?? ""}
                onChange={(e) =>
                  handleMedidaChange(
                    "medidas_liquidas",
                    campo,
                    Number(e.target.value),
                  )
                }
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 STATUS */}
        <Typography variant="h6">Status</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.serrada === "OK"}
                  onChange={(e) => handleCheck("serrada", e.target.checked)}
                />
              }
              label="Serrada"
            />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.envelopamento === "OK"}
                  onChange={(e) =>
                    handleCheck("envelopamento", e.target.checked)
                  }
                />
              }
              label="Envelopamento"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 DADOS GERAIS */}
        <Typography variant="h6">Informações</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={3}>
            <TextField
              label="Empresa"
              type="number"
              fullWidth
              value={form.empresa}
              onChange={(e) => handleChange("empresa", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Marcação"
              fullWidth
              value={form.marcacao || ""}
              onChange={(e) => handleChange("marcacao", e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Venda"
              fullWidth
              value={form.venda || ""}
              onChange={(e) => handleChange("venda", e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Carregamento"
              fullWidth
              value={form.carregamento || ""}
              onChange={(e) => handleChange("carregamento", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Frete"
              fullWidth
              value={form.frete || ""}
              onChange={(e) => handleChange("frete", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const tipos = [
  { label: "Cliente", value: "cliente" },
  { label: "Fornecedor", value: "fornecedor" },
  { label: "Transportador", value: "transportador" },
  { label: "Empresa", value: "empresa" },
];

const initialForm = {
  tipo: "cliente",
  razao_social: "",
  nome_fantasia: "",
  cnpj: "",
  cnaes: "",
  natureza_juridica: "",
  porte: "",
  capital_social: "",
  endereco: "",
};

export function ModalCadastroPessoa({
  open,
  onClose,
  onSave,
  initialData = null,
}) {
  const [form, setForm] = useState(initialForm);

  // 🔁 carrega dados ou reseta
  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...initialForm, ...initialData } : initialForm);
    }
  }, [open, initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    handleClose();
  };

  const handleClose = () => {
    setForm(initialForm); // 🔥 limpa ao fechar
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Cadastro de {form.tipo?.toUpperCase()}</DialogTitle>

      <DialogContent dividers>
        {/* 🔹 TIPO */}
        <Typography variant="h6" gutterBottom>
          Tipo
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Tipo"
              fullWidth
              value={form.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}
            >
              {/* {tipos.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))} */}
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 DADOS PRINCIPAIS */}
        <Typography variant="h6" gutterBottom>
          Dados da Empresa
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Razão Social"
              fullWidth
              value={form.razao_social}
              onChange={(e) => handleChange("razao_social", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nome Fantasia"
              fullWidth
              value={form.nome_fantasia}
              onChange={(e) => handleChange("nome_fantasia", e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="CNPJ"
              fullWidth
              value={form.cnpj}
              onChange={(e) => handleChange("cnpj", e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="CNAEs"
              fullWidth
              value={form.cnaes}
              onChange={(e) => handleChange("cnaes", e.target.value)}
              helperText="Separe por vírgula"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Natureza Jurídica"
              fullWidth
              value={form.natureza_juridica}
              onChange={(e) =>
                handleChange("natureza_juridica", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Porte"
              placeholder="ME, EPP..."
              fullWidth
              value={form.porte}
              onChange={(e) => handleChange("porte", e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Capital Social"
              type="number"
              fullWidth
              value={form.capital_social}
              onChange={(e) => handleChange("capital_social", e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* 🔹 ENDEREÇO */}
        <Typography variant="h6" gutterBottom>
          Endereço Comercial
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              fullWidth
              value={form.endereco}
              onChange={(e) => handleChange("endereco", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
