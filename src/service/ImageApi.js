export default class ImageApi {
  API_BASE = 'https://api.unsplash.com/';

  getPhoto = async (term) => {
    return await fetch(`${this.API_BASE}/search/photos?query=${term}&per_page=1`, {
      headers: {
        'Authorization': 'Client-ID 6oHjzWJYHuW53cF1wmFJbjKRdiMR5Zr56zbUCPzjfB8'
      }
    }).then(response => response.json());
  };
};