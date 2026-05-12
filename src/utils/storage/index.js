export function setSession(name, value) {
  sessionStorage.setItem(name, value);
}

export function getSession(name) {
  return sessionStorage.getItem(name);
}

export function delSession(name) {
  return sessionStorage.removeItem(name);
}

export function setLocal(name, value) {
  localStorage.setItem(name, value);
}

export function getLocal(name) {
  return localStorage.getItem(name);
}

export function removeLocal(name) {
  return localStorage.removeItem(name);
}
