import { HttpMethod, HttpRequest } from "../network/HttpRequest";
import { Navigation } from "../view/Navigation";
import { LinksDetector } from "./LinksDetector";
import { HTMLSanitizer } from "./Sanitizer";

export class LinkEventTrigger {
  private hrefElement: Element;
  private link: string;
  private rootElement: Element;
  private nextPageRootElement: Element;
  private querySelector: string;
  private linkTitle: string;

  constructor(
    hrefElement: Element,
    rootElement: Element,
    querySelector: string
  ) {
    this.hrefElement = hrefElement;
    this.link = hrefElement.getAttribute("href").valueOf();
    this.rootElement = rootElement;
    this.querySelector = querySelector;
  }

  public async run(): Promise<void> {
    const request = new HttpRequest(HttpMethod.GET, this.link);
    const requestReponseContent = await request.send();

    const htmlSanitizer = new HTMLSanitizer();

    const nextPage = new DOMParser().parseFromString(
      htmlSanitizer.clean(requestReponseContent),
      "text/html"
    );

    this.linkTitle = nextPage.querySelector("title")?.innerText;

    if (!this.linkTitle) {
      throw new Error("All pages must having <title> HTML tag.");
    }

    this.nextPageRootElement = nextPage.querySelector(this.querySelector);

    this.hrefElement.addEventListener("click", this.triggerEvent.bind(this));
  }

  private triggerEvent(event: Event): void {
    event.preventDefault();

    Navigation.navigate(this.linkTitle, this.link);

    this.rootElement.innerHTML = this.nextPageRootElement.innerHTML;

    const linksDetector = new LinksDetector(
      this.rootElement,
      this.querySelector
    );

    linksDetector.run();
  }
}
