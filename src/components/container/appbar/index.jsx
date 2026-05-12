import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import ModalEditarBloco, { ModalCadastroPessoa } from "../../model";

export default function NavBar({ styles = {} }) {
  // 🧠 controla qual modal está aberto
  const [modalType, setModalType] = useState(null);

  // 🆕 bloco padrão
  const novoBloco = {
    numero: "",
    empresa: 1,
    medidas_brutas: { largura: 0, altura: 0, comprimento: 0, m3: 0 },
    medidas_liquidas: { largura: 0, altura: 0, comprimento: 0, m3: 0 },
    marcacao: "",
    venda: "",
    serrada: null,
    envelopamento: null,
    carregamento: "",
    frete: "",
  };

  const handleSaveBloco = (data) => {
    console.log("Novo bloco:", data);
  };

  const handleSavePessoa = (data) => {
    console.log("Pessoa:", data);
  };

  const handleClose = () => setModalType(null);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          ...styles.nav,
        }}
      >
        <Toolbar>

          {/* 🔹 Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Avatar
                alt="Logo StackBloco"
                src="/assets/logo.png"
                sx={{ width: 40, height: 40 }}
              />
            </Link>

            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              StackBloco
            </Typography>
          </Box>

          {/* 🔹 Botões */}
          <Stack direction="row" spacing={1} alignItems="center">

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 3,
                bgcolor: "#fff",
                color: "primary.main",
                fontWeight: 600,
              }}
              size="small"
              onClick={() => setModalType("bloco")}
            >
              Novo Bloco
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonIcon />}
              sx={{ borderRadius: 3, borderColor: "#fff", color: "#fff" }}
              onClick={() => setModalType("cliente")}
              size="small"
            >
              Cliente
            </Button>

            <Button
              variant="outlined"
              startIcon={<BusinessIcon />}
              sx={{ borderRadius: 3, borderColor: "#fff", color: "#fff" }}
              onClick={() => setModalType("empresa")}
              size="small"
            >
              Empresa
            </Button>

          </Stack>
        </Toolbar>
      </AppBar>

      {/* 🪟 Modal BLOCO */}
      <ModalEditarBloco
        open={modalType === "bloco"}
        onClose={handleClose}
        bloco={novoBloco}
        onSave={handleSaveBloco}
      />

      {/* 🪟 Modal CLIENTE / EMPRESA */}
      <ModalCadastroPessoa
        open={modalType === "cliente" || modalType === "empresa"}
        onClose={handleClose}
        onSave={handleSavePessoa}
        initialData={{
          tipo: modalType === "empresa" ? "empresa" : "cliente",
        }}
      />
    </>
  );
}