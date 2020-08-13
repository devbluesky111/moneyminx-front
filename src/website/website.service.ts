import axios from 'axios';

export const fetchBlogs = async (postSize: number = 5) => {
  const url = `https://velocity.moneyminx.com//wp-json/wp/v2/posts?per_page=3&categories=${postSize}&order=asc`;
  const res = await axios.get(url);

  return res;
};
