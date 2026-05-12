import iDB from "../../services/indexedDB/db";
import { getUser } from "../user";
let user = getUser().nome;


function carregarMovimentos(listaMov, sigla) {
  let lista = listaMov;
  lista = [{ codigo: 0, nome: 'Sem Movimento', sigla: sigla, ordem: -1 }, ...lista];
  let novalista = [];
  lista.forEach(item => {
    novalista.push({ ...item, atendimentos: [], total: 0 });
  });
  return novalista;
}


export function groupAtendimentos(lista, listaMov) {
  const listaMovimentos = carregarMovimentos(listaMov, lista[0].tipo)
  let listaAtendimentos = {
    tipo: lista[0].tipo,
    atendimentos: [
      { grupo: 'Meus atendimentos', subgrupos: [], atendimentos: [], total: 0 },
      { grupo: 'Sendo atendidos', subgrupos: [], atendimentos: [], total: 0 },
      { grupo: 'Retornados', subgrupos: [], atendimentos: [], total: 0 },
      { grupo: 'Aguardando', subgrupos: [], atendimentos: [], total: 0 }
    ],
    total: 0
  };

  for (const item of listaAtendimentos.atendimentos) {
    item.subgrupos = JSON.parse(JSON.stringify(listaMovimentos));
  }

  function _agruparMovimento(atendimento, index) {
    for (const item of listaMovimentos) {
      if (item.codigo === atendimento.movimento) {
        for (let subItem of listaAtendimentos.atendimentos[index].subgrupos) {
          if (subItem.codigo === atendimento.movimento) {
            subItem.atendimentos.push(atendimento);
            subItem.total = subItem.atendimentos.length;
          }
        }
      }
    }
  }

  function _meus(atendimento) {
    if ((atendimento.status === 'P' || atendimento.status === 'L' || atendimento.status === 'R') && !atendimento.retornado) {
      _agruparMovimento(atendimento, 3);
      return true;
    }
    return false;
  }

  function _atendidos(atendimento) {
    if (atendimento.retornado && atendimento.status !== 'A') {
      _agruparMovimento(atendimento, 2);
      return true;
    }
    return false;
  }

  function _retornados(atendimento) {
    if (atendimento.status === 'A' && user !== atendimento.atendpref) {
      _agruparMovimento(atendimento, 1);
      return true;
    }
    return false;
  }

  function _aguardando(atendimento) {
    if (atendimento.status === 'A' && user === atendimento.atendpref) {
      _agruparMovimento(atendimento, 0);
      return true;
    }
    return false;
  }

  let atendimentosRestantes = [...lista[0].atendimentos];
  atendimentosRestantes = atendimentosRestantes.filter(item => !_meus(item));
  atendimentosRestantes = atendimentosRestantes.filter(item => !_atendidos(item));
  atendimentosRestantes = atendimentosRestantes.filter(item => !_retornados(item));
  atendimentosRestantes = atendimentosRestantes.filter(item => !_aguardando(item));

  listaAtendimentos.total = lista[0].atendimentos.length;

  for (const grupo of listaAtendimentos.atendimentos) {
    grupo.subgrupos = grupo.subgrupos.filter(sub => sub.total > 0);
  }

  return listaAtendimentos;
}
