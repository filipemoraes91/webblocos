import { useState } from "react";

export function drag(ev, sourceColumnId) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("sourceColumnId", sourceColumnId);
}

export const allowDrop = (ev) => {
  ev.preventDefault();
};

export const drop = async (ev, destino) => {
  const data = ev.dataTransfer.getData("text"); 
  console.log(data)
  // if (destino !== "" && destino !== null && destino !== "null")
  //   await putMovimentoAt(idSac, destino);
  // toggleAtualizar(true);
};
