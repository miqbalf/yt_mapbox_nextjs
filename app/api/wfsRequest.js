const service = 'WFS';
const outputFormat = 'json';
const access_token = 'HSBXhcQT6afVETQ43FJVw66lQpGtPm';

//const encodedUrl = `/geoserver/ows?service=${encodeURIComponent(service)}&outputFormat=${encodeURIComponent(outputFormat)}&access_token=${encodeURIComponent(access_token)}`;

const REQUEST_PARAMS = {
    outputFormat: 'application/json',
    //maxFeatures: 250,
    request: 'GetFeature',
    service: 'WFS',
    typeName: 'geonode:us_states_dd12ca07117989e94d85bf9e226532fed01282f71927a',
    version: '1.1.0',
    //access_token: 'HSBXhcQT6afVETQ43FJVw66lQpGtPm',
  };

const params = new URLSearchParams(REQUEST_PARAMS).toString()

const wfsUrl = `https://stable.demo.geonode.org/geoserver/ows?${params}`; 
//const wfsUrl = encodedUrl


const requestWFS = () => {
  fetch(wfsUrl, {
  method: 'GET', // Use the appropriate HTTP method (GET, POST, etc.)
  headers: {
    'Content-Type': 'application/json', // Set the content type as needed
    // Add any other headers if required
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then((data) => {
    // Use the JSON data as needed
    console.log(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

}

export {requestWFS}