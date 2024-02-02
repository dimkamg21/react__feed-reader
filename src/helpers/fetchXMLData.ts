export async function fetchXmlData(url: string): Promise<Document> {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();

    return parser.parseFromString(xmlText, 'text/xml');
}

