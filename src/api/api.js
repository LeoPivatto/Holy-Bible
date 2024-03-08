
export const fetchPassagesData = async (bibleId, passagesId) => {
  try {
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/passages/${passagesId}`;
    const response = await fetch(url, {
      headers: { 'api-key': process.env.REACT_APP_API_KEY }
    });
    const result = await response.json()
    return result.data;
  } catch (error) {
    throw error;
  }
};