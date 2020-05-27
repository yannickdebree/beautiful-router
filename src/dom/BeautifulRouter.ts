import { LinksDetector } from "./LinksDetector";

export class BeautifulRouter {
  public static querySelector: string;

  constructor(querySelector: string) {
    BeautifulRouter.querySelector = querySelector;

    const rootElement = document.querySelector(querySelector);

    if (!rootElement) {
      throw new Error(`"${querySelector}" element don't exists in DOM.`);
    }

    const linksDetector = new LinksDetector(rootElement, querySelector);
    linksDetector.run();
  }
}
