import { getAvailableLinks, HttpMethod, navigate, sendRequest } from "../utils";
import { BeautifulRouterCache } from "./BeautifulRouterCache";
import { BeautifulRouterOptions } from "./BeautifulRouterOptions";

export class BeautifulRouter {
  private root: HTMLElement;
  private cache = new BeautifulRouterCache();

  constructor(
    private readonly rootQuerySelector: string,
    private readonly options?: BeautifulRouterOptions
  ) {
    this.root = document.querySelector(rootQuerySelector);

    if (!this.root) {
      throw new Error(`"${rootQuerySelector}" element don't exists in DOM.`);
    }

    this.runLinksDetection();
  }

  runLinksDetection() {
    const availableLinks = getAvailableLinks();

    console.log(availableLinks);

    availableLinks.forEach((link) => this.createClickTrigger(link));
  }

  async createClickTrigger(link: HTMLElement) {
    const hrefValue = link.attributes.getNamedItem("href").value;

    const redirectionToTheCurrentPage =
      window.location.pathname === `/${hrefValue}`;

    if (
      !redirectionToTheCurrentPage &&
      !this.cache.get(hrefValue) &&
      (this.options.cachableRoutes === "*" || !this.options.cachableRoutes.includes(hrefValue))
    ) {
      const responseContent = await sendRequest(
        HttpMethod.GET,
        link.attributes.getNamedItem("href").textContent
      );

      this.cache.set(hrefValue, responseContent);
    }

    link.addEventListener("click", (event) => {
      console.log(event);

      event.preventDefault();

      this.clickHandler(hrefValue);
    });
  }

  clickHandler(hrefValue: string) {
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

      this.runLinksDetection();
    }
  }


}
