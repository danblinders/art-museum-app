export default class MuseumApi {
  API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

  getResource = async (url) => await fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error ('Issues loading resource');
    }
  });

  getDepartments = async () => {
    return await this.getResource(`${this.API_BASE}/departments`).then(resource => resource.departments);
  };

  getDepartmentCollection = async (departmentId) => {
    return await this.getResource(`${this.API_BASE}/objects?departmentIds=${departmentId}`)
      .then(resource => resource.objectIDs);
  };

  getArtwork = async (artworkId) => await this.getResource(`${this.API_BASE}/objects/${artworkId}`);

  getArtworksWithFilters = async (term, filters) => {
    let queryString = `${this.API_BASE}/search?`;
    
    for (const filter in filters) {
      queryString += `${filter}=${filters[filter]}&`;
    }

    queryString += `q=${term}`;

    return await this.getResource(queryString).then(resource => resource.objectIDs);
  };
};