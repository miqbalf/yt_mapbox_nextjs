import axios from "axios";
import CONFIG from "../config";

//const service = 'WFS';
//const outputFormat = 'json';
//const access_token = 'HSBXhcQT6afVETQ43FJVw66lQpGtPm';

//const encodedUrl = `/geoserver/ows?service=${encodeURIComponent(service)}&outputFormat=${encodeURIComponent(outputFormat)}&access_token=${encodeURIComponent(access_token)}`;

const REQUEST_PARAMS = {
    outputFormat: 'application/json',
    //maxFeatures: 250,
    request: 'GetFeature',
    service: 'WFS',
    typeName: CONFIG.LAYER_WFS_EXAMPLE,
    version: '1.1.0',
    //access_token: CONFIG.GEOSERVER_TOKEN,
  };

//const params = new URLSearchParams(REQUEST_PARAMS).toString()

//const wfsUrl = `http://192.168.56.5/geoserver/ows?${params}`; 
//const wfsUrl = encodedUrl

const requestWFS = async () => {
  
    // Fetch WFS data from GeoServer
    const wfsResponse = await axios.get(`${CONFIG.BASE_URL_BACKEND}/geoserver/ows`, {
      params: REQUEST_PARAMS,
    });
    //console.log(wfsResponse.data)
    return wfsResponse.data
    
};

export default requestWFS;