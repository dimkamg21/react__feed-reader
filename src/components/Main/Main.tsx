import { useEffect, useState } from "react";
import { Feed } from "../../types/Feed.ts";
import { fetchXmlData } from "../../helpers/fetchXMLData.ts";
import { getDataFromXML } from "../../helpers/getDataFromXML.ts";

export const Main = () => {
  const [items, setItems] = useState<Feed[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xmlDoc = await fetchXmlData(
          "https://www.nasa.gov/news-release/feed/",
        );
        const newsData = getDataFromXML(xmlDoc);

        setItems(newsData);
      } catch (error) {
        throw new Error("Error fetching XML:" + error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title card-header-title">Main page here3</h1>

      {items && (
        <div className="box">
          {items.map((item) => (
            <div key={item.title} className="box">
              <h1 className="card-header-title">{item.title}</h1>
              <p className="is-dark">{item.pubDate}</p>
              <div
                className="box"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
