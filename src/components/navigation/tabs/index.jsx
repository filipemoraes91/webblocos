import { useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Box, Divider, Chip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { upperLowerCaseFormat } from "../../../utils/string";
import { listBlocos as blocosMock } from "../../../utils/constructor";
import ListaBlocos from "../../list";
import ModalEditarBloco from "../../model";

export default function TabGeral({ listTabs = [] }) {
  const navigate = useNavigate();
  const { empresa } = useParams();

  // 🧠 normaliza os dados (empresa sempre número)
  const [blocos, setBlocos] = useState(() =>
    (blocosMock || []).map((b) => ({
      ...b,
      empresa: Number(b.empresa),
    })),
  );

  // 🔒 valor inicial seguro
  const getInitialValue = () => {
    const fromUrl = Number(empresa);
    if (fromUrl > 0) return fromUrl;

    const first = Number(listTabs?.[0]?.value);
    return first > 0 ? first : 1;
  };

  const [value, setValue] = useState(getInitialValue);

  // 🪟 modal
  const [openModal, setOpenModal] = useState(false);
  const [blocoSelecionado, setBlocoSelecionado] = useState(null);

  // 🔁 sincroniza com URL
  useEffect(() => {
    const fromUrl = Number(empresa);
    if (fromUrl > 0) setValue(fromUrl);
  }, [empresa]);

  // 🔁 troca de tab
  const handleChange = (event, newValue) => {
    const val = Number(newValue);
    if (!val) return;

    setValue(val);
    navigate(`/home/${val}`);
  };

  // 🔍 filtro correto
  const blocosFiltrados = useMemo(() => {
    return blocos.filter((b) => b.empresa === value);
  }, [blocos, value]);

  // ✏️ abrir modal
  const handleEdit = (item) => {
    setBlocoSelecionado(item);
    setOpenModal(true);
  };

  // 💾 salvar edição
  const handleSave = (blocoAtualizado) => {
    setBlocos((prev) =>
      prev.map((b) =>
        b.numero === blocoAtualizado.numero ? blocoAtualizado : b,
      ),
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: 2,
          pt: 1,
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        {listTabs.map((tab) => {
          const tabValue = Number(tab.value); // 🔥 garante número
          const isActive = value === tabValue;

          const total = blocos.filter((b) => b.empresa === tabValue).length;

          return (
            <Tab
              key={tabValue}
              value={tabValue}
              label={
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  {upperLowerCaseFormat(tab.nome)}

                  <Chip
                    size="small"
                    label={total}
                    sx={{
                      bgcolor: isActive
                        ? "rgba(255,255,255,0.2)"
                        : "action.selected",
                      color: isActive ? "#fff" : "text.primary",
                    }}
                  />
                </Box>
              }
              sx={{
                textTransform: "none",
                borderRadius: 3,
                px: 2,
                minHeight: 40,
                backgroundColor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "text.primary",
                fontWeight: isActive ? 600 : 400,
                "&:hover": {
                  backgroundColor: isActive ? "primary.dark" : "action.hover",
                },
              }}
            />
          );
        })}
      </Tabs>

      <Divider sx={{ opacity: 0.2 }} />

      {/* Lista */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto", p: 1 }}>
        <ListaBlocos data={blocosFiltrados} onEdit={handleEdit} />
      </Box>

      {/* Modal */}
      <ModalEditarBloco
        open={openModal}
        onClose={() => setOpenModal(false)}
        bloco={blocoSelecionado}
        onSave={handleSave}
      />
    </Box>
  );
}
