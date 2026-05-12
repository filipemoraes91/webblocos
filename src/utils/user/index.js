// import { descript } from "..";
import { descript } from "../crypto";
import { filtrarLista } from "../geral";
import { getSession } from "../storage";

let userInit = {
  administrador: "",
  exp: 0,
  iss: "Stackbloco",
  nome: "",
  permissoes: "",
  servico: "",
  sub: "",
};

export function getUser() {
  let usuario = getSession("token_sac")
    ? JSON.parse(descript(getSession("token_sac")))
    : userInit;
  return usuario;
}

export function permRender(perm, component) {
  try {
    if (getUser().permissoes.includes(perm)) return component;
    else return "";
  } catch {
    return "";
  }
}

export function getPerm(valor) {
  try {
    let perm = getSession("token_sac")
      ? JSON.parse(descript(getSession("token_sac"))).permissoes.toString()
      : "0";
    return perm.includes(valor);
  } catch {
    return "0";
  }
}

export function getNomeUsu(codigo, lista) {
  try {
    return filtrarLista(lista, "codigo", codigo)[0].login;
  } catch {
    return "";
  }
}

export function validarToken() {
  const validToken = getSession("token_sac")
    ? JSON.parse(descript(getSession("token_sac")))
    : userInit;

  const agora = Date.now(); // em ms
  return  ((validToken.exp * 1000), agora)
  
}
