import HTMLSanitizer from "../sanitizers/html.sanitizer";

export default class BeautifulRouterCache {
  private cache: { [key: string]: string } = {};
  private htmlSanitizer = new HTMLSanitizer();

  get(key: string) {
    return this.cache[key];
  }

  set(key: string, value: string) {
    this.cache[key] = this.htmlSanitizer.clean(value);
  }
}
