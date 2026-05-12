import { orderList } from "../geral";
import { getUser } from "../user";

export function groupAtendimentos(lista, listaMov) {
  const user = getUser().nome;
  const data = Array.isArray(lista) ? lista[0] || {} : lista || {};
  const tipo = data.tipo || "AT";
  const atendimentos = Array.isArray(data.atendimentos)
    ? data.atendimentos
    : [];

  const grupos = [
    { grupo: "Meus atendimentos", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Sendo atendidos", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Retornados", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Aguardando", subgrupos: [], atendimentos: [], total: 0 },
  ];

  const movimentos = carregarMovimentos(
    Array.isArray(listaMov) ? listaMov : [],
    tipo,
  );

  const subMapByGroup = grupos.map(() => new Map());

  grupos.forEach((grupo, index) => {
    if (movimentos?.length > 1) {
      grupo.subgrupos = movimentos.map((mov) => {
        const sub = { ...mov, atendimentos: [], total: 0 };
        subMapByGroup[index].set(mov.codigo, sub);
        return sub;
      });
    }
  });

  const getGroupIndex = (atendimento) => {
    if (
      (atendimento.status === "P" ||
        atendimento.status === "L" ||
        atendimento.status === "R") &&
      !atendimento.retornado
    ) {
      return 3;
    }
    if (atendimento.retornado && atendimento.status !== "A") {
      return 2;
    }
    if (atendimento.status === "A" && user !== atendimento.atendpref) {
      return 1;
    }
    if (atendimento.status === "A" && user === atendimento.atendpref) {
      return 0;
    }
    return -1;
  };

  const ordenarLista = (lista) => {
    return lista.sort((a, b) => {
      if (a.prioridade !== b.prioridade) {
        return a.prioridade - b.prioridade;
      }

      // data_agendamento (mais recente primeiro 🔥)
      const dataA = new Date(a.data_agendamento || 0);
      const dataB = new Date(b.data_agendamento || 0);

      return dataB - dataA;
    });
  };

  for (const atendimento of atendimentos) {
    const idx = getGroupIndex(atendimento);
    if (idx < 0) continue;

    const grupo = grupos[idx];
    grupo.atendimentos.push(atendimento);

    const movCodigo = atendimento.movimento ?? atendimento.mov ?? 0;
    const sub = subMapByGroup[idx].get(movCodigo);
    if (sub) {
      sub.atendimentos.push(atendimento);
      sub.total += 1;
    }
    grupo.total += 1;
  }

  grupos.forEach((grupo) => {
    ordenarLista(grupo.atendimentos);

    grupo.subgrupos.forEach((sub) => {
      ordenarLista(sub.atendimentos);
    });
  });

  grupos.forEach((grupo) => {
    grupo.subgrupos = grupo.subgrupos.filter((sub) => sub.total > 0);
    grupo.total = grupo.subgrupos.reduce((soma, sub) => soma + sub.total, 0);
  });

  return {
    tipo,
    atendimentos: grupos,
    total: atendimentos.length,
  };
}

function carregarMovimentos(listaMov, sigla) {
  let lista = listaMov;
  lista = [
    { codigo: 0, nome: "Sem Movimento", sigla: sigla, ordem: -1 },
    ...lista,
  ];
  let novalista = [];
  lista.forEach((item) => {
    novalista.push({ ...item, atendimentos: [], total: 0 });
  });
  return novalista;
}

export function groupMovimentos(lista, movimentos) {
  const listMovimentos = {
    movimentos: [
      { codigo: 0, nome: "Sem movimento", sigla: "", ordem: 0 },
      ...movimentos,
    ],
    total: lista[0].atendimentos?.length || 0,
  };
  // console.log(listMovimentos);
  let listAtendimentos = [];
  for (let i = 0; i < listMovimentos.movimentos?.length; i++) {
    listAtendimentos = lista[0].atendimentos.filter((at) => {
      if (at.movimento === listMovimentos.movimentos[i].codigo) return at;
    });
    listMovimentos.movimentos[i] = {
      ...listMovimentos.movimentos[i],
      atendimentos: listAtendimentos,
      total: listAtendimentos?.length,
    };
  }
  
  listMovimentos.movimentos = orderList(listMovimentos.movimentos, 'ordem');

  return listMovimentos;
}
