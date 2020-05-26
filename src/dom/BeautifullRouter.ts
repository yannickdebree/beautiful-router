import { LinksDetector } from "./LinksDetector";

export class BeautifullRouter {
  public static querySelector: string;

  constructor(querySelector: string) {
    BeautifullRouter.querySelector = querySelector;

    const rootElement = document.querySelector(querySelector);

    if (!rootElement) {
      throw new Error(`"${querySelector}" element don't exists in DOM.`);
    }

    const linksDetector = new LinksDetector(rootElement, querySelector);
    linksDetector.run();
  }
}
