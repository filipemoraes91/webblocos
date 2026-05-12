export function getTipo(tipo) {
  switch (tipo) {
    case "D":
      return "Documentação";
    case "V":
      return "Versionamento";
    default:
      break;
  }
}

export function getTreeViewFaq(rastreios, faqs) {
  let listaFaqs = faqs;
  let novaListaFaqs = [];
  for (let i = 0; i < rastreios?.length; i++) {
    for (let j = 0; j < listaFaqs?.length; j++) {
      if (rastreios[i].codigo === listaFaqs[j].rastreio) {
        novaListaFaqs.push(listaFaqs[i]);
      }
    }
  }
}

export function cleanHtml(html) {
  return html.replace(/(background(-color)?|color)\s*:\s*[^;]+;?/gi, "");
}
