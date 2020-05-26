import { LinkEventTrigger } from "./LinkEventTrigger";

export class LinksDetector {
  private rootElement: Element;
  private querySelector: string;

  constructor(rootElement: Element, querySelector: string) {
    this.rootElement = rootElement;
    this.querySelector = querySelector;
  }

  public async run(): Promise<void> {
    const hrefElements = new Array<Element>();

    document.querySelectorAll("a[href]").forEach((href) => {
      hrefElements.push(href);
    });

    hrefElements.forEach((hrefElement) => {
      const linkEventTrigger = new LinkEventTrigger(
        hrefElement,
        this.rootElement,
        this.querySelector
      );
      linkEventTrigger.run();
    });
  }
}
