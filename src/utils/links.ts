// TODO : complete black list.
const linksBlackList = [new RegExp("mailto://"), new RegExp("tel://")];

export function getAvailableLinksOnCurrentPage(): HTMLElement[] {
    const availableLinks = new Array<HTMLElement>();

    document.querySelectorAll("a[href]").forEach((link: HTMLElement) => {
        const hrefValue = link.attributes.getNamedItem("href").value;

        const blackListLength = linksBlackList.length;

        let isAvailable = true;

        for (let i = 0; i < blackListLength; ++i) {
            if (linksBlackList[i].test(hrefValue)) {
                isAvailable = false;
            }
        }

        if (isAvailable) {
            availableLinks.push(link);
        }
    });

    return availableLinks;
}
