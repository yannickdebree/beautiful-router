import { HttpMethod } from "./http-method";

export async function sendRequest(
  method: HttpMethod,
  url: string
) {
  return fetch(url, { method }).then((response) => response.text());
}
