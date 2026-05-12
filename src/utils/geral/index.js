import { listaLength } from "../string";

// export function orderList(lista, campo, ordem) {
//   return lista.sort((a, b) => {
//     if (a[campo] > b[campo]) {
//       return 1;
//     }
//     if (a[campo] < b[campo]) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// }

export function orderList(lista, campo, ordem = "asc") {
  return lista.sort((a, b) =>
    ordem === "asc"
      ? a[campo] - b[campo]
      : b[campo] - a[campo]
  );
}

export function filtrarLista(lista, filtro, valor) {
  let listaNova = [];
  for (let i = 0; i < listaLength(lista); i++) {
    if (lista[i][filtro] === valor) {
      listaNova.push(lista[i]);
    }
  }
  return listaNova;
}

export function filtrarListaSimples(lista, valor) {
  let listaNova = [];
  for (let i = 0; i < listaLength(lista); i++) {
    if (lista[i] === valor) {
      listaNova.push(lista[i]);
    }
  }
  return listaNova;
}

export function verificarRota(valor) {
  let path = window.location.pathname.toLowerCase();
  return path.indexOf(valor) > 0;
}

export function getValorSelect(value, items, key = "codigo") {
  if (!items || items.length === 0) return "";
  const options = items.map((item) => item[key]);
  return options.includes(value) ? value : "";
}
