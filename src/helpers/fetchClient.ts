const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getData = async <T>(url: string): Promise<T> => {
  return fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error('cant load data');
      }

      return response.json();
    });
};
