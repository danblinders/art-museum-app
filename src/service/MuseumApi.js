export default class MuseumApi {
  API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

  getResource = async (url) => await fetch(url).then(response => response.json());

  getDepartments = () => {
    return this.getResource(`${this.API_BASE}/departments`);
  };

  getArtwork = (artworkId) => {
    return this.getResource(`${this.API_BASE}/objects/${artworkId}`);
  };
};