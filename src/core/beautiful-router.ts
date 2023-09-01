import { HttpMethod } from "../utils/http-method";
import { getAvailableLinksOnCurrentPage } from "../utils/links";
import { navigate } from "../utils/navigation";
import { sendRequest } from "../utils/requests";
import BeautifulRouterCache from "./beautiful-router.cache";
import BeautifulRouterOptions from "./beautiful-router.options";

export default class BeautifulRouter {
  private root: HTMLElement;
  private cache = new BeautifulRouterCache();

  constructor(
    private readonly rootQuerySelector: string,
    private readonly options?: BeautifulRouterOptions
  ) {
    const root = document.querySelector<HTMLElement>(rootQuerySelector);

    if (!root) {
      throw new Error(`"${rootQuerySelector}" element don't exists in DOM.`);
    }

    this.root = root;

    this.detectLinksOnCurrentPage();
  }

  private detectLinksOnCurrentPage(): void {
    const linkElements = getAvailableLinksOnCurrentPage();

    linkElements.forEach(linkElement => this.createClickTrigger(linkElement));
  }

  private async createClickTrigger(link: HTMLElement): Promise<void> {
    const hrefValue = link.attributes.getNamedItem("href").value;

    const cachedValue = this.cache.get(hrefValue);

    const routeCacheDisabled = this.options.cachableRoutes !== "*" && !this.options.cachableRoutes.includes(hrefValue);

    if (!!cachedValue || routeCacheDisabled) {
      return Promise.resolve();
    }

    const responseContent = await sendRequest(
      HttpMethod.GET,
      link.attributes.getNamedItem("href").textContent
    );

    this.cache.set(hrefValue, responseContent);

    link.addEventListener("click", (event) => {
      event.preventDefault();

      this.clickHandler(hrefValue);
    });
  }

  private clickHandler(hrefValue: string): void {
    const nextContent = this.cache.get(hrefValue);

    if (nextContent) {
      const nextPage = new DOMParser().parseFromString(nextContent, "text/html");

      const nextPageRoot = nextPage.querySelector(this.rootQuerySelector);

      const newTitle = nextPage.querySelector("title")?.innerText;

      navigate(newTitle, hrefValue);

      if (newTitle) {
        document.title = newTitle;
      }

      this.root.innerHTML = nextPageRoot.innerHTML;

      this.detectLinksOnCurrentPage();
    }
  }
}
