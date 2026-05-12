import React from "react";
import {
  List,
  ListItem,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Chip de status
const StatusChip = ({ label }) => {
  if (!label) {
    return <Chip label="-" size="small" variant="outlined" />;
  }

  const colorMap = {
    OK: "success",
    PENDENTE: "warning",
  };

  return (
    <Chip
      label={label}
      size="small"
      color={colorMap[label] || "default"}
    />
  );
};

export default function ListaBlocosPremium({ data = [], onEdit }) {
  return (
    <List sx={{ width: "100%" }}>
      {data.map((item, index) => (
        <React.Fragment key={item.numero}>
          <ListItem disableGutters sx={{ mb: 1 }}>
            <Paper
              elevation={2}
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
              }}
            >
              <Grid container spacing={2} alignItems="center">
                
                {/* Bloco */}
                <Grid item xs={12} md={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    #{item.numero}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Empresa {item.empresa}
                  </Typography>
                </Grid>

                {/* Medidas */}
                <Grid item xs={12} md={3}>
                  <Typography variant="caption" color="text.secondary">
                    Bruto
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.medidas_brutas.m3} m³
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Líquido
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.medidas_liquidas.m3} m³
                  </Typography>
                </Grid>

                {/* Marca / Venda */}
                <Grid item xs={12} md={2}>
                  <Typography variant="caption" color="text.secondary">
                    Marca
                  </Typography>
                  <Typography fontWeight={500}>
                    {item.marcacao}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Venda
                  </Typography>
                  <Typography>{item.venda || "-"}</Typography>
                </Grid>

                {/* Status empilhado */}
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Serrada
                      </Typography>
                      <StatusChip label={item.serrada} />
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Envelopamento
                      </Typography>
                      <StatusChip label={item.envelopamento} />
                    </Box>

                  </Box>
                </Grid>

                {/* Carregamento + Frete empilhado */}
                <Grid item xs={12} md={2}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Carregamento
                      </Typography>
                      <Typography variant="body2">
                        {item.carregamento || "-"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Frete
                      </Typography>
                      <Typography fontWeight={500}>
                        {item.frete || "-"}
                      </Typography>
                    </Box>

                  </Box>
                </Grid>

              </Grid>

              {/* Botão editar */}
              <IconButton
                color="primary"
                onClick={() => onEdit && onEdit(item)}
                sx={{
                  ml: 2,
                  backgroundColor: "rgba(25,118,210,0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.2)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Paper>
          </ListItem>

          {index < data.length - 1 && (
            <Divider sx={{ opacity: 0.3 }} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}