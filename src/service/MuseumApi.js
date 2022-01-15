export default class MuseumApi {
  API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

  getResource = async (url) => await fetch(url).then(response => response.json());

  getDepartments = async () => {
    return await this.getResource(`${this.API_BASE}/departments`).then(resource => resource.departments);
  };

  getDepartmentCollection = async (departmentId) => {
    return await this.getResource(`${this.API_BASE}/objects?departmentId=${departmentId}`)
      .then(resource => resource.objectIDs);
  };

  getArtwork = async (artworkId) => await this.getResource(`${this.API_BASE}/objects/${artworkId}`);

  getArtworksWithFilters = async (searchParams) => {
    return await this.getResource(`${this.API_BASE}/search${searchParams}`).then(resource => resource.objectIDs);
  };
};