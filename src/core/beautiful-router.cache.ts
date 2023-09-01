import HTMLSanitizer from "../sanitizers/html.sanitizer";

export default class BeautifulRouterCache {
  private cache: { [key: string]: string } = {};
  private htmlSanitizer = new HTMLSanitizer();

  get(key: string): string | undefined {
    return this.cache[key];
  }

  set(key: string, value: string): void {
    this.cache[key] = this.htmlSanitizer.clean(value);
  }
}
