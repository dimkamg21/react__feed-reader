import { Feed } from "../types/Feed.ts";

export async function getDataFromXML(url: string): Promise<Feed[]> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const articles = xmlDoc.querySelectorAll('item');

        const feedItems: Feed[] = Array.from(articles).map((article, index) => ({
            id: index,
            title: article.querySelector('title')?.textContent || '',
            description: article.querySelector('description')?.textContent || '',
            pubDate: article.querySelector('pubDate')?.textContent || '',
        }));

        return feedItems;
    } catch (error) {
        console.error('Error fetching and parsing XML data:', error);
        throw error;
    }
}
