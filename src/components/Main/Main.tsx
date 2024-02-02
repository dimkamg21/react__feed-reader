import { useState } from "react";

interface Item {
  title: string,
  pubDate: string,
  description: string
}
export const Main = () => {
  const [items, setItems] = useState<Item | null>(null);

  fetch("https://www.nasa.gov/news-release/feed/");

  return (
      <>
        <h1 className="title card-header-title">Main page here</h1>

        {items && (
            <div>
              {items.title}
              {items.pubDate}
              {items.description}
            </div>
        )}
      </>
  );
};
