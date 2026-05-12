export function getDataISO() {
  const date = new Date();
  return date.toISOString();
}

export function formatDateTime(data) {
  let date = new Date(data);

  function digito(valor) {
    if (valor < 10) {
      return "0" + valor;
    } else {
      return valor;
    }
  }

  return (
    date.toLocaleDateString() +
    " " +
    digito(date.getHours() + 3) +
    ":" +
    digito(date.getMinutes()) +
    ":" +
    digito(date.getSeconds())
  );
}

export function formatInputDate(data) {
  try {
    let date = new Date(data);
    return date.toISOString().slice(0, 10);
  } catch {
    return data;
  }
}

export function formatInputDateTime(data) {
  let date = new Date(data);
  function digito(valor) {
    if (valor < 10) {
      return "0" + valor;
    } else {
      return valor;
    }
  }
  return date.toISOString().slice(0, 11) + digito(date.getHours()) + ":" + digito(date.getMinutes());
}

export function formatInputDateTimeUTC(date) {
  const data = new Date(date);
  const horas = data.getHours();
  const minutos = data.getMinutes();
  const horaFormatada = `${data.toISOString().slice(0, 11)}${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:00.00-0300`;
  return horaFormatada;
}

export function formatDataUnix(data) {
  let date = "";
  if (data.length === 10) {
    date = new Date(data + "T03:00:00Z");
  } else if (data.length === 16) {
    let dt = formatInputDateTimeUTC(data);
    date = new Date(dt);
  } else {
    date = new Date(data);
  }

  function dateToUnix(data) {
    return Math.floor(data.getTime() / 1000);
  }
  const unixTime = dateToUnix(date);
  return unixTime;
}

export function dataHoraAtual() {
  const date = new Date();
  return formatInputDateTime(date);
}

export function CampararData(data) {
  try {
    const dataAtual = dataHoraAtual();
    let dataHash = new Date(data.toString());
    dataHash.setMinutes(dataHash.getMinutes() + 20);
    dataHash = formatInputDateTime(dataHash);
    return dataAtual <= dataHash;
  } catch (error) {
    return false;
  }
}
