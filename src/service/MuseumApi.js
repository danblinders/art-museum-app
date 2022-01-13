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

  getArtworksWithFilters = async (term, filters) => {
    let queryString = `${this.API_BASE}/search?q=${term}&`;

    filters.forEach((filter, filterIndex) => {
      const filterString = `${filter.name}=${filter.value}${filterIndex === filters.length - 1 ? '' : '&'}`;
      queryString += filterString;
    });

    const artworksIdsArr = await this.getResource(queryString).then(resource => resource.objectIDs);

    const artworksPromisesArr = artworksIdsArr.map(async artworkId => {
      return await this.getArtwork(artworkId);
    });

    return await Promise.all(artworksPromisesArr);
  };
};