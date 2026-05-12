import React from "react";
import { Box, Grid2 } from "@mui/material";
import { TypographyFAQ, TypographySubTitle, TypographyTitle } from "../datadisplay/typography";
import { formatDateTime } from "../../utils/date";
import { cleanHtml } from "../../utils/faq";
import { useThemeContext } from "../../context/themeContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-toolbar-light.css";

export function BoxFaq(props) {
  const faqSelect = props.faqSelect;
  return (
    <Box sx={{ borderBottom: "1px solid red" }}>
      <TypographyTitle text={faqSelect.titulo} />
      <TypographyTitle text={faqSelect.rastreio} />
      <Grid2 container>
        <Grid2 size={{ sm: 12, md: 3 }}>
          <TypographySubTitle text={"Criado por: " + faqSelect.criadopor} />
        </Grid2>
        <Grid2 size={{ sm: 12, md: 3 }}>
          <TypographySubTitle text={"Aprovado por: " + faqSelect.aprovadopor} />
        </Grid2>
        <Grid2 size={{ sm: 12, md: 3 }}>
          <TypographySubTitle text={"Versão: " + faqSelect.versao} />
        </Grid2>
        <Grid2 size={{ sm: 12, md: 3 }}>
          <TypographySubTitle text={"Data: " + formatDateTime(faqSelect.data)} />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export function DivFaq(props) {
  const { theme } = useThemeContext();
  const descricao = props.descricao;
  const anotacoes = props.anotacoes;
  return (
    <>
      <div
        id="conteudo"
        style={{
          background: "none  !important",
          backgroundColor: "transparent !important",
          color: theme.color,
          fontSize: "16px",
          width: "100%",
          margin: "0 auto",
          overflow: "auto",
          wordWrap: "break-word",
          whiteSpace: "normal",
          lineHeight: 1.5,
          textRendering: "optimizeLegibility",
          fontWeight: "400",
          letterSpacing: "0.00988em",
          textAlign: "justify",
        }}
        dangerouslySetInnerHTML={{
          __html: descricao ? cleanHtml(descricao) : "",
        }}
      />
      {anotacoes?.length > 0 &&
        anotacoes.map((a, idx) => <ListAnotacoes key={idx} conteudo={a.conteudo} codigo={a.codigo} />)}
    </>
  );
}

function ListAnotacoes(props) {
  return <TypographyFAQ text={cleanHtml(props.codigo + ": " + props.conteudo)} />;
}

export function QuillFaq(props) {
  const { theme } = useThemeContext();

  const quillModules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={props.value}
      onChange={props.onChange}
      modules={quillModules}
      style={{ minHeight: "100px", background: "inherit", borderRadius: 4, color: theme.color }}
      placeholder="Digite o texto do FAQ aqui..."
    />
  );
}
