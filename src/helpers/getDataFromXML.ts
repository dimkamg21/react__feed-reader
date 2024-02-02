import {Feed} from "../types/Feed.ts";

export function getDataFromXML(xmlDoc: Document): Feed[] {
    const articles = xmlDoc.querySelectorAll('item');

    return Array.from(articles).map((article, index) => ({
        id: index,
        title: article.querySelector('title')?.textContent || '',
        description: article.querySelector('description')?.textContent || '',
        pubDate: article.querySelector('pubDate')?.textContent || '',
    }));
}
