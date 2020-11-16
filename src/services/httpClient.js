import axios from "axios"

const urlBase = process.env.API_URL

/**
 * @param {string}  url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = "") =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${urlBase}/${url}`

export async function get(url = "", headers = {}) {
  const result = await axios.get(readUrl(url), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
  return result
}

export async function post(url = "", body = {}, headers = {}) {
  const result = await axios.post(readUrl(url), body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
  return result
}

export async function put(url = "", body = {}, headers = {}) {
  const result = await axios.put(readUrl(url), body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
  return result
}

export async function del(url = "", headers = {}) {
  const result = await axios.delete(readUrl(url), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
  return result
}
