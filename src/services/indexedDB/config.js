export const DB_NAME = "db_sac";
export const DB_VERSION = 1;

export const OBJECT_STORES = [
  {
    name: "tipos",
    options: { keyPath: "codigo" },
  },
  {
    name: "programas",
    options: { keyPath: "codigo" },
  },
  {
    name: "assuntos",
    options: { keyPath: "codigo" },
  },
  {
    name: "movimentos",
    options: { keyPath: "codigo" },
  },
  {
    name: "configuracoes",
    options: { keyPath: "config" },
  },
  {
    name: "usuarios",
    options: { keyPath: "codigo" },
  },
  {
    name: "marcadores",
    options: { keyPath: "nome" },
  }
];
