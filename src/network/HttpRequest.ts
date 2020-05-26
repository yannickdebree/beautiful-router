export enum HttpMethod {
  GET = "GET",
}

export class HttpRequest {
  private method: HttpMethod;
  private url: string;

  constructor(method: HttpMethod, url: string) {
    this.method = method;
    this.url = url;
  }

  public async send(): Promise<string> {
    return fetch(this.url, { method: this.method }).then((response) => {
      return response.text();
    });
  }
}
