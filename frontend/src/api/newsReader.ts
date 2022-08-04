import { DEVBY, NewsData, ONLINER } from "../interfaces";


export function getRssFeed(feed: string) {
    return fetch(feed)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then((data) => {
            const items = data.querySelectorAll('item');

            let newsData: NewsData[] = [];
            items.forEach((el, i) => {
                newsData.push(createNewsData(el, feed));
            });
            return newsData;
        });
}

function createNewsData(el: Element, site: string): NewsData {
    switch (site) {
        case DEVBY:
            return {
                id: el.querySelector('link')?.innerHTML || "",
                image: el?.querySelector('enclosure')?.getAttribute('url') || "",
                text: el.querySelector('title')?.innerHTML || "",
                link: el.querySelector('link')?.innerHTML || "",
                html: "",
                date: el.querySelector('pubDate')?.innerHTML || "",
                status: 'devby'
            }
        case ONLINER:
            return {
                id: el.querySelector('link')?.innerHTML || "",
                image: el?.getElementsByTagName('media:thumbnail')?.item(0)?.getAttribute('url') || "",
                text: el.querySelector('title')?.innerHTML.slice(9, -2) || "",
                link: el.querySelector('link')?.innerHTML || "",
                html: "",
                date: el.querySelector('pubDate')?.innerHTML || "",
                status: 'onliner'
            }
        default:
            throw new Error(`We dont support site ${site} ! `);
    }

}