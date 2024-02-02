import { Post } from "../types/Post.ts";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getDataFromJSON = async (id: number) => {
  try {
    const response = await fetch(BASE_URL + `/posts?userId=${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Post[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
