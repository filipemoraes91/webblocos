import { getLocal } from "../storage";

export function formatCnpjCpf(valor) {
  if (valor !== undefined) {
    if (valor.length === 11) {
      return (
        valor.slice(0, 3, valor) +
        "." +
        valor.slice(3, 6, valor) +
        "." +
        valor.slice(6, 9, valor) +
        "/" +
        valor.slice(9, 11, valor)
      );
    } else {
      return (
        valor.slice(0, 2, valor) +
        "." +
        valor.slice(2, 5, valor) +
        "." +
        valor.slice(5, 8, valor) +
        "/" +
        valor.slice(8, 12, valor) +
        "-" +
        valor.slice(12, 14, valor)
      );
    }
  } else {
    return "";
  }
}

export function coalesceString(texto, valor) {
  if (texto === "") {
    return valor;
  } else {
    return texto;
  }
}

export function listaLength(lista) {
  try {
    return lista.length;
  } catch {
    return 0;
  }
}

export function getMensagemFinal() {
  return JSON.parse(getLocal("msgFinalizar"));
}

export function upperLowerCaseFormat(text) {
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}

// export function TextoComQuebraDeLinha(texto) {
//   try {
//     const linhas = texto.split("\n").map((linha, index) => (
//       <React.Fragment key={index}>
//         {linha}
//         <br />
//       </React.Fragment>
//     ));

//     return <>{linhas}</>;
//   } catch (error) {
//     return "";
//   }
// }

export function formatTelfone(valor) {
  let numbers = valor.replace(/\D/g, "");

  // Remove código do país (55) se presente
  if (numbers.startsWith("55") && numbers.length >= 12) {
    numbers = numbers.slice(2);
  }

  if (numbers.length > 11) {
    numbers = numbers.slice(0, 11);
  }
  if (numbers.length > 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length > 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else if (numbers.length > 2) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length > 0) {
    return `(${numbers}`;
  }
  return "";
}
