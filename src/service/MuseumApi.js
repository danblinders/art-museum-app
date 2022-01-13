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

  // getArtworkCollection = async (filters) => {
  //   let queryString = `${this.API_BASE}/search?`;

  //   filters.forEach((filter, filterIndex) => {
  //     const filterString = `${filter.name}=${filter.value}${filterIndex === filters.length - 1 ? '' : '&'}`;
  //     queryString += filterString;
  //   });

  //   return await this.getResource(queryString).then(resource => resource.objectIDs);
  // };

  getArtwork = async (artworkId) => {
    const resource = await this.getResource(`${this.API_BASE}/objects/${artworkId}`);
    return resource;
  };
};